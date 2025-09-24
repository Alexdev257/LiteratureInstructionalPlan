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
    public class ChangeEmailCommandHandler : IRequestHandler<ChangeEmailCommand, ChangeEmailResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ISessionExtensions _sessionExtensions;
        private readonly IEmailHelper _emailHelper;
        private readonly IOtpHelper _otpHelper;

        public ChangeEmailCommandHandler(IUserRepository userRepository, ISessionExtensions sessionExtensions, IEmailHelper emailHelper, IOtpHelper otpHelper)
        {
            _userRepository = userRepository;
            _sessionExtensions = sessionExtensions;
            _emailHelper = emailHelper;
            _otpHelper = otpHelper;
        }
        public async Task<ChangeEmailResponse> Handle(ChangeEmailCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetAsync(new Query.User.UserGetQuery { UserId = request.UserId});
            if(user == null)
            {
                return new ChangeEmailResponse()
                {
                    IsSuccess = false,
                    Message = "Account does not exist!",
                };
            }

            var updatedUser = new LIP.Domain.Entities.User
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = request.NewEmail,
                Password = user.Password,
                RoleId = user.RoleId,
                FullName = user.FullName,
                CreatedAt = user.CreatedAt,
                DeletedAt = user.DeletedAt,
                IsDeleted = user.IsDeleted,
            };
            
            var otp = _otpHelper.GenerateOtpAsync(6);
            var dictionary = new Dictionary<string, string>
            {
                {"otp", otp}
            };
            var body = $"Your OTP is otp. It will expire in 5 minutes.";
            var rs = await _emailHelper.SendEmailAsync(request.NewEmail, "Change Email Confirmation", body, dictionary);
            if (rs)
            {
                _sessionExtensions.Set<string>($"OTP_{otp}", otp);
                _sessionExtensions.Set<LIP.Domain.Entities.User>($"UdU_{otp}", updatedUser);
                return new ChangeEmailResponse
                {
                    IsSuccess = true,
                    Message = "Send ChangeEmail OTP to email successfully!"
                };
            }
            else
            {
                return new ChangeEmailResponse
                {
                    IsSuccess = false,
                    Message = "Some errors occurred while sending OTP through email"
                };
            }
        }
    }
}
