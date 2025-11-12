using LIP.Application.CQRS.Command.Auth;
using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Auth;

public class LoginGoogleCommandHandler : IRequestHandler<LoginGoogleCommand, LoginGoogleResponse>
{
    private readonly IBcryptHelper _bcryptHelper;
    private readonly IEmailHelper _emailHelper;
    private readonly IGoogleOAuthHelper _googleOAuthHelper;
    private readonly IJwtHelper _jwtHelper;
    private readonly IRedisHelper _redisHelper;
    private readonly IUserRepository _userRepository;

    public LoginGoogleCommandHandler(IGoogleOAuthHelper googleOAuthHelper, IJwtHelper jwtHelper,
        IUserRepository userRepository, IBcryptHelper bcryptHelper, IEmailHelper emailHelper, IRedisHelper redisHelper)
    {
        _googleOAuthHelper = googleOAuthHelper;
        _jwtHelper = jwtHelper;
        _userRepository = userRepository;
        _bcryptHelper = bcryptHelper;
        _emailHelper = emailHelper;
        _redisHelper = redisHelper;
    }

    public async Task<LoginGoogleResponse> Handle(LoginGoogleCommand request, CancellationToken cancellationToken)
    {
        var validatedResult = await _googleOAuthHelper.ValidateGoogleTokenAsync(request.GoogleToken);
        if (!validatedResult.IsValid)
            return new LoginGoogleResponse
            {
                IsSuccess = false,
                Message = "Invalid Google token",
                ListErrors = new List<Errors>
                {
                    new() { Field = "GoogleToken", Detail = validatedResult.ErrorMessage }
                }
            };

        var userList = await _userRepository.GetAllAsync(new UserGetAllQuery { Email = validatedResult.Email });
        var user = userList.ToList().FirstOrDefault();
        if (user == null)
        {
            user = new Domain.Entities.User
            {
                FullName = validatedResult.Name,
                UserName = validatedResult.Email,
                CreatedAt = DateTime.UtcNow,
                Email = validatedResult.Email,
                RoleId = 1,
                Password = _bcryptHelper.HashPassword("123") // random password
            };

            await _userRepository.CreateAsync(new UserCreateCommand
            {
                FullName = user.FullName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UserName = user.UserName,
                RoleId = user.RoleId,
                Password = user.Password
            });

            var userListEmail =
                await _userRepository.GetAllAsync(new UserGetAllQuery { Email = validatedResult.Email });
            var userEmail = userList.ToList().FirstOrDefault();

            var dictionnary = new Dictionary<string, string>
            {
                { "PASSWORD", "123" }
            };
            var body =
                $"Your account has been created successfully. Your username is {user.UserName} and your password is PASSWORD. Please change your password after logging in.";
            var rsEmail =
                await _emailHelper.SendEmailAsync(userEmail.Email, "Welcome to LIP Company", body, dictionnary);
            var AccessToken = _jwtHelper.GenerateAccessToken(userEmail);
            var RefreshToken = _jwtHelper.GenerateRefreshToken();
            await _redisHelper.SetAsync($"RT_{userEmail?.UserId}", RefreshToken, TimeSpan.FromHours(1));
            return new LoginGoogleResponse
            {
                IsSuccess = true,
                Message = "Login with Google successfully! Please check your email to get your password.",
                Data = new LoginGoogleResponseDTO
                {
                    AccessToken = AccessToken,
                    RefreshToken = RefreshToken
                }
            };
        }
        else
        {
            var AccessToken = _jwtHelper.GenerateAccessToken(user);
            var RefreshToken = _jwtHelper.GenerateRefreshToken();
            await _redisHelper.SetAsync($"RT_{user.UserId}", RefreshToken, TimeSpan.FromHours(1));
            return new LoginGoogleResponse
            {
                IsSuccess = true,
                Message = "Login with Google successfully!",
                Data = new LoginGoogleResponseDTO
                {
                    AccessToken = AccessToken,
                    RefreshToken = RefreshToken
                }
            };
        }
    }
}