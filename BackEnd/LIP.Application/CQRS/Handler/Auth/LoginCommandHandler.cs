using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtHelper _jwtHelper;
        private readonly IBcryptHelper _bcryptHelper;
        private readonly ISessionExtensions _sessionExtensions;
        private readonly IRedisHelper _redisHelper;
        public LoginCommandHandler(IUserRepository userRepository, IJwtHelper jwtHelper, IBcryptHelper bcryptHelper, ISessionExtensions sessionExtensions, IRedisHelper redisHelper)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
            _bcryptHelper = bcryptHelper;
            _sessionExtensions = sessionExtensions;
            _redisHelper = redisHelper;

        }
        public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = _userRepository.GetAllAsync(new Query.User.UserGetAllQuery() { Email = request.Email }).Result.ToList().FirstOrDefault();
            if (user == null)
            {
                return new LoginResponse
                {
                    IsSuccess = false,
                    Message = "Invalid email!",
                };
            }
            var isPasswordValid = _bcryptHelper.VerifyPassword(request.Password, user.Password);
            if (!isPasswordValid)
            {
                return new LoginResponse
                {
                    IsSuccess = false,
                    Message = "Invalid password!",
                };
            }
            else
            {
                var accessToken = _jwtHelper.GenerateAccessToken(user);
                var refreshToken = _jwtHelper.GenerateRefreshToken();
                //_sessionExtensions.Set<string>($"RT_{user.UserId}", refreshToken);
                await _redisHelper.SetAsync<string>($"RT_{user.UserId}", refreshToken, TimeSpan.FromHours(1));
                return new LoginResponse
                {
                    IsSuccess = true,
                    Message = "Login successfully!",
                    Data = new LoginResponseDTO
                    {
                        AccessToken = accessToken,
                        RefreshToken = refreshToken,
                    }
                };
            }
        }
    }
}
