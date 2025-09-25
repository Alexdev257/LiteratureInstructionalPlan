using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class VerifyForgotPasswordCommandHandler : IRequestHandler<VerifyForgotPasswordCommand, VerifyForgotPasswordResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ISessionExtensions _sessionExtensions;
        private readonly IRedisHelper _redisHelper;
        public VerifyForgotPasswordCommandHandler(IUserRepository userRepository, ISessionExtensions sessionExtensions, IRedisHelper redisHelper)
        {
            _userRepository = userRepository;
            _sessionExtensions = sessionExtensions;
            _redisHelper = redisHelper;

        }
        public async Task<VerifyForgotPasswordResponse> Handle(VerifyForgotPasswordCommand request, CancellationToken cancellationToken)
        {
            //var otp = _sessionExtensions.Get<string>($"FP_{request.OTP}");
            //var user = _sessionExtensions.Get<LIP.Domain.Entities.User>($"FPOJ_{request.OTP}");
            var otp = await _redisHelper.GetAsync<string>($"FP_{request.OTP}");
            var user = await _redisHelper.GetAsync<LIP.Domain.Entities.User>($"FPOJ_{request.OTP}");

            if(otp == null || user == null)
            {
                return new VerifyForgotPasswordResponse
                {
                    IsSuccess = false,
                    Message = "OTP is invalid or has expired"
                };
            }
            else
            {
                var rs = await _userRepository.UpdateAsync(new Command.User.UserUpdateCommand()
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    CreatedAt = user.CreatedAt,
                    DeletedAt = user.DeletedAt,
                    IsDeleted = user.IsDeleted
                });
                //_sessionExtensions.Remove($"FP_{otp}");
                //_sessionExtensions.Remove($"FPOJ_{otp}");
                await _redisHelper.RemoveAsync($"FP_{request.OTP}");
                await _redisHelper.RemoveAsync($"FPOJ_{request.OTP}");
                if (rs)
                {
                    return new VerifyForgotPasswordResponse
                    {
                        IsSuccess = true,
                        Message = "Forgot Password successfully!"
                    };
                }
                else
                {
                    return new VerifyForgotPasswordResponse
                    {
                        IsSuccess = false,
                        Message = "Forgot Password failed!"
                    };
                }
                
            }
        }
    }
}
