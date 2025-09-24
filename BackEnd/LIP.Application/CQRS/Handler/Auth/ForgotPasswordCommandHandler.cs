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
    public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, ForgotPasswordResponse>
    {
        private readonly ISessionExtensions _sessionExtensions;
        private readonly IEmailHelper _emailHelper;
        private readonly IOtpHelper _otpHelper;
        private readonly IUserRepository _userRepository;
        private readonly IBcryptHelper _bcryptHelper;
        public ForgotPasswordCommandHandler(ISessionExtensions sessionExtensions, IEmailHelper emailHelper, IOtpHelper otpHelper, IUserRepository userRepository, IBcryptHelper bcryptHelper)
        {
            _sessionExtensions = sessionExtensions;
            _emailHelper = emailHelper;
            _otpHelper = otpHelper;
            _userRepository = userRepository;
            _bcryptHelper = bcryptHelper;
        }
        public async Task<ForgotPasswordResponse> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
        {
            var user = _userRepository.GetAllAsync(new Query.User.UserGetAllQuery() { Email = request.Email }).Result.ToList().FirstOrDefault();
            if (user == null)
            {
                return new ForgotPasswordResponse
                {
                    IsSuccess = false,
                    Message = "Email does not exist",
                };
            }
            var hasedNewPassword = _bcryptHelper.HashPassword(request.NewPassword);
            var updatedUser = new LIP.Domain.Entities.User
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Password = hasedNewPassword,
                CreatedAt = user.CreatedAt,
                DeletedAt = user.DeletedAt,
                FullName = user.FullName,
                IsDeleted = user.IsDeleted,
                RoleId = user.RoleId,
            };
            //user.Password = hasedNewPassword;

            var otp = _otpHelper.GenerateOtpAsync(6);
            var dictionary = new Dictionary<string, string>
            {
                { "otp", otp},
            };
            var body = $"Your OTP is otp. It will expire in 5 minutes.";
            var rs = await _emailHelper.SendEmailAsync(request.Email, "Forgot password LIP Company", body, dictionary);
            if (rs)
            {
                _sessionExtensions.Set<string>($"FP_{otp}", otp);
                _sessionExtensions.Set<LIP.Domain.Entities.User>($"FPOJ_{otp}", updatedUser);
                return new ForgotPasswordResponse
                {
                    IsSuccess = true,
                    Message = "Send ForgotPassword OTP to email successfully!"
                };
            }
            else
            {
                return new ForgotPasswordResponse
                {
                    IsSuccess = false,
                    Message = "Some errors occurred while sending OTP through email"
                };
            }
            
        }
    }
}
