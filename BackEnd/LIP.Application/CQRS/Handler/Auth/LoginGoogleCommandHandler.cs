using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class LoginGoogleCommandHandler : IRequestHandler<LoginGoogleCommand, LoginGoogleResponse>
    {
        private readonly IGoogleOAuthHelper _googleOAuthHelper;
        private readonly IJwtHelper _jwtHelper;
        private readonly IUserRepository _userRepository;
        private readonly IBcryptHelper _bcryptHelper;
        private readonly IEmailHelper _emailHelper;
        public LoginGoogleCommandHandler(IGoogleOAuthHelper googleOAuthHelper, IJwtHelper jwtHelper, IUserRepository userRepository, IBcryptHelper bcryptHelper, IEmailHelper emailHelper)
        {
            _googleOAuthHelper = googleOAuthHelper;
            _jwtHelper = jwtHelper;
            _userRepository = userRepository;
            _bcryptHelper = bcryptHelper;
            _emailHelper = emailHelper;
        }

        public async Task<LoginGoogleResponse> Handle(LoginGoogleCommand request, CancellationToken cancellationToken)
        {
            var validatedResult = await _googleOAuthHelper.ValidateGoogleTokenAsync(request.GoogleToken);
            if(!validatedResult.IsValid)
            {
                return new LoginGoogleResponse
                {
                    IsSuccess = false,
                    Message = "Invalid Google token",
                    ListErrors = new List<Errors> {
                        new Errors { Field = "GoogleToken", Detail = validatedResult.ErrorMessage }
                    }
                };
            }

            var userList = await _userRepository.GetAllAsync(new Query.User.UserGetAllQuery { Email = validatedResult.Email });
            var user = userList.ToList().FirstOrDefault();
            if (user == null)
            {
                user = new Domain.Entities.User
                {
                    FullName = validatedResult.Name,
                    UserName = validatedResult.Email,
                    CreatedAt = DateTime.UtcNow,
                    Email = validatedResult.Email,
                    RoleId = 1, //default user
                    Password = _bcryptHelper.HashPassword("123"), // random password
                };

                await _userRepository.CreateAsync(new Command.User.UserCreateCommand
                {
                    FullName = user.FullName,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt,
                    UserName = user.UserName,
                    RoleId = user.RoleId,
                    Password = user.Password,
                });
                var dictionnary = new Dictionary<string, string>
                    {
                        {"PASSWORD", "123" },
                    };
                var body = $"Your account has been created successfully. Your username is {user.UserName} and your password is PASSWORD. Please change your password after logging in.";
                var rsEmail = await _emailHelper.SendEmailAsync(user.Email, "Welcome to LIP Company", body, dictionnary);
                return new LoginGoogleResponse
                {
                    IsSuccess = true,
                    Message = "Login with Google successfully! Please check your email to get your password.",
                    Data = new LoginGoogleResponseDTO
                    {
                        AccessToken = _jwtHelper.GenerateAccessToken(user),
                        RefreshToken = _jwtHelper.GenerateRefreshToken(),
                    }
                };
            }
            else
            {
                return new LoginGoogleResponse
                {
                    IsSuccess = true,
                    Message = "Login with Google successfully!",
                    Data = new LoginGoogleResponseDTO
                    {
                        AccessToken = _jwtHelper.GenerateAccessToken(user),
                        RefreshToken = _jwtHelper.GenerateRefreshToken(),
                    }
                };
            }
        }
    }
}
