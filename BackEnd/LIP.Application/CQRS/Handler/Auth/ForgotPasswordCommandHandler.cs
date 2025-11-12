using LIP.Application.CQRS.Command.Auth;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Auth;

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, ForgotPasswordResponse>
{
    private readonly IBcryptHelper _bcryptHelper;
    private readonly IEmailHelper _emailHelper;
    private readonly IOtpHelper _otpHelper;
    private readonly IRedisHelper _redisHelper;
    private readonly ISessionExtensions _sessionExtensions;
    private readonly IUserRepository _userRepository;

    public ForgotPasswordCommandHandler(ISessionExtensions sessionExtensions, IEmailHelper emailHelper,
        IOtpHelper otpHelper, IUserRepository userRepository, IBcryptHelper bcryptHelper, IRedisHelper redisHelper)
    {
        _sessionExtensions = sessionExtensions;
        _emailHelper = emailHelper;
        _otpHelper = otpHelper;
        _userRepository = userRepository;
        _bcryptHelper = bcryptHelper;
        _redisHelper = redisHelper;
    }

    public async Task<ForgotPasswordResponse> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = _userRepository.GetAllAsync(new UserGetAllQuery { Email = request.Email }).Result.ToList()
            .FirstOrDefault();
        if (user == null)
            return new ForgotPasswordResponse
            {
                IsSuccess = false,
                Message = "Email does not exist"
            };
        var hasedNewPassword = _bcryptHelper.HashPassword(request.NewPassword);
        var updatedUser = new Domain.Entities.User
        {
            UserId = user.UserId,
            UserName = user.UserName,
            Email = user.Email,
            Password = hasedNewPassword,
            CreatedAt = user.CreatedAt,
            DeletedAt = user.DeletedAt,
            FullName = user.FullName,
            IsDeleted = user.IsDeleted,
            RoleId = user.RoleId
        };
        //user.Password = hasedNewPassword;

        var otp = _otpHelper.GenerateOtpAsync(6);
        var dictionary = new Dictionary<string, string>
        {
            { "otp", otp }
        };
        var body = "Your OTP is otp. It will expire in 5 minutes.";
        var rs = await _emailHelper.SendEmailAsync(request.Email, "Forgot password LIP Company", body, dictionary);
        if (rs)
        {
            //_sessionExtensions.Set<string>($"FP_{otp}", otp);
            //_sessionExtensions.Set<LIP.Domain.Entities.User>($"FPOJ_{otp}", updatedUser);
            await _redisHelper.SetAsync($"FP_{otp}", otp, TimeSpan.FromMinutes(5));
            await _redisHelper.SetAsync<Domain.Entities.User>($"FPOJ_{otp}", updatedUser, TimeSpan.FromMinutes(5));
            return new ForgotPasswordResponse
            {
                IsSuccess = true,
                Message = "Send ForgotPassword OTP to email successfully!"
            };
        }

        return new ForgotPasswordResponse
        {
            IsSuccess = false,
            Message = "Some errors occurred while sending OTP through email"
        };
    }
}