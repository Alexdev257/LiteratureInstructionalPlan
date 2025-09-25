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
    public class VerifyChangeEmailCommandHandler : IRequestHandler<VerifyChangeEmailCommand, VerifyChangeEmailResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ISessionExtensions _sessionExtensions;
        private readonly IRedisHelper _redisHelper;
        public VerifyChangeEmailCommandHandler(IUserRepository userRepository, ISessionExtensions sessionExtensions, IRedisHelper redisHelper)
        {
            _userRepository = userRepository;
            _sessionExtensions = sessionExtensions;
            _redisHelper = redisHelper;

        }
        public async Task<VerifyChangeEmailResponse> Handle(VerifyChangeEmailCommand request, CancellationToken cancellationToken)
        {
            //var otp = _sessionExtensions.Get<string>($"OTP_{request.OTP}");
            //var user = _sessionExtensions.Get<LIP.Domain.Entities.User>($"UdU_{request.OTP}");
            var otp = await _redisHelper.GetAsync<string>($"OTP_{request.OTP}");
            var user = await _redisHelper.GetAsync<LIP.Domain.Entities.User>($"UdU_{request.OTP}");
            if(request.NewEmail != user.Email)
            {
                return new VerifyChangeEmailResponse
                {
                    IsSuccess = false,
                    Message = "New Email is not valid with the previous step!",
                };
            }
            if( otp== null || user == null )
            {
                return new VerifyChangeEmailResponse
                {
                    IsSuccess = false,
                    Message = "OTP is invalid or has expired"
                };
            }
            else
            {
                var rs = await _userRepository.UpdateAsync(new Command.User.UserUpdateCommand
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FullName = user.FullName,
                    UserName = user.UserName,
                    CreatedAt = user.CreatedAt,
                    DeletedAt = user.DeletedAt,
                    Password = user.Password,
                    IsDeleted = user.IsDeleted,
                    RoleId = user.RoleId,
                });
                //_sessionExtensions.Remove($"OTP_{request.OTP}");
                //_sessionExtensions.Remove($"UdU_{request.OTP}");
                await _redisHelper.RemoveAsync($"OTP_{otp}");
                await _redisHelper.RemoveAsync($"UdU_{otp}");
                if (rs)
                {
                    return new VerifyChangeEmailResponse
                    {
                        IsSuccess = true,
                        Message = "Change Email Successfully!"
                    };
                }
                else
                {
                    return new VerifyChangeEmailResponse
                    {
                        IsSuccess = false,
                        Message = "Change Email failed!"
                    };
                }
            }
        }
    }
}
