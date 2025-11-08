using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Auth;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, RegisterResponse>
{
    private readonly IBcryptHelper _bcryptHelper;
    private readonly IEmailHelper _emailHelper;
    private readonly IOtpHelper _otpHelper;
    private readonly IRedisHelper _redisHelper;
    private readonly ISessionExtensions _sessionExtensions;

    private readonly IUserRepository _userRepository;

    //private readonly IWebHostEnvironment _webHostEnvironment;
    public RegisterCommandHandler(IUserRepository userRepository, IBcryptHelper bcryptHelper, IEmailHelper emailHelper,
        ISessionExtensions sessionExtensions, IOtpHelper otpHelper, IRedisHelper redisHelper)
    {
        _userRepository = userRepository;
        _bcryptHelper = bcryptHelper;
        _emailHelper = emailHelper;
        _sessionExtensions = sessionExtensions;
        _otpHelper = otpHelper;
        _redisHelper = redisHelper;
    }

    public async Task<RegisterResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var hashedPassword = _bcryptHelper.HashPassword(request.Password);
        var user = new Domain.Entities.User
        {
            UserName = request.UserName,
            FullName = request.FullName,
            Email = request.Email,
            Password = hashedPassword,
            RoleId = 1,
            CreatedAt = DateTime.UtcNow
        };
        var otp = _otpHelper.GenerateOtpAsync(6);
        var dictionary = new Dictionary<string, string>
        {
            { "otp", otp }
        };
        var body = "Your OTP is otp. It will expire in 5 minutes.";
        var rs = await _emailHelper.SendEmailAsync(request.Email, "Welcome to LIP", body, dictionary);
        //var rs = await _userRepository.RegisterAsync(user);
        if (rs)
        {
            //_sessionExtensions.Set<string>($"OTP_{otp}", otp);
            //_sessionExtensions.Set<LIP.Domain.Entities.User>($"User_{otp}", user);
            await _redisHelper.SetAsync($"OTP_{otp}", otp, TimeSpan.FromMinutes(5));
            await _redisHelper.SetAsync<Domain.Entities.User>($"User_{otp}", user, TimeSpan.FromMinutes(5));

            return new RegisterResponse
            {
                IsSuccess = true,
                Message = "Sending OTP to email successfully!"
            };
        }

        return new RegisterResponse
        {
            IsSuccess = false,
            Message = "Some errors occurred while sending OTP through email"
        };
    }
}