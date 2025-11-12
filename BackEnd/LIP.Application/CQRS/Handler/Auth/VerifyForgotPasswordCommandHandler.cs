using LIP.Application.CQRS.Command.Auth;
using LIP.Application.CQRS.Command.User;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Auth;

public class
    VerifyForgotPasswordCommandHandler : IRequestHandler<VerifyForgotPasswordCommand, VerifyForgotPasswordResponse>
{
    private readonly IRedisHelper _redisHelper;
    private readonly ISessionExtensions _sessionExtensions;
    private readonly IUserRepository _userRepository;

    public VerifyForgotPasswordCommandHandler(IUserRepository userRepository, ISessionExtensions sessionExtensions,
        IRedisHelper redisHelper)
    {
        _userRepository = userRepository;
        _sessionExtensions = sessionExtensions;
        _redisHelper = redisHelper;
    }

    public async Task<VerifyForgotPasswordResponse> Handle(VerifyForgotPasswordCommand request,
        CancellationToken cancellationToken)
    {
        //var otp = _sessionExtensions.Get<string>($"FP_{request.OTP}");
        //var user = _sessionExtensions.Get<LIP.Domain.Entities.User>($"FPOJ_{request.OTP}");
        var otp = await _redisHelper.GetAsync<string>($"FP_{request.OTP}");
        var user = await _redisHelper.GetAsync<Domain.Entities.User>($"FPOJ_{request.OTP}");

        if (otp == null || user == null)
            return new VerifyForgotPasswordResponse
            {
                IsSuccess = false,
                Message = "OTP is invalid or has expired"
            };

        var rs = await _userRepository.UpdateAsync(new UserUpdateCommand
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
            return new VerifyForgotPasswordResponse
            {
                IsSuccess = true,
                Message = "Forgot Password successfully!"
            };

        return new VerifyForgotPasswordResponse
        {
            IsSuccess = false,
            Message = "Forgot Password failed!"
        };
    }
}