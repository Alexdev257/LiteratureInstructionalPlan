using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Auth;

public class VerifyRegisterCommandHandler : IRequestHandler<VerifyRegisterCommand, VerifyRegisterResponse>
{
    private readonly IRedisHelper _redisHelper;
    private readonly ISessionExtensions _sessionExtensions;
    private readonly IUserRepository _userRepository;

    public VerifyRegisterCommandHandler(ISessionExtensions sessionExtensions, IUserRepository userRepository,
        IRedisHelper redisHelper)
    {
        _sessionExtensions = sessionExtensions;
        _userRepository = userRepository;
        _redisHelper = redisHelper;
    }

    public async Task<VerifyRegisterResponse> Handle(VerifyRegisterCommand request, CancellationToken cancellationToken)
    {
        //var otp = _sessionExtensions.Get<string>($"OTP_{request.Otp}");
        //var user = _sessionExtensions.Get<LIP.Domain.Entities.User>($"User_{request.Otp}");
        var otp = await _redisHelper.GetAsync<string>($"OTP_{request.Otp}");
        var user = await _redisHelper.GetAsync<Domain.Entities.User>($"User_{request.Otp}");
        if (otp == null || user == null)
            return await Task.FromResult(new VerifyRegisterResponse
            {
                IsSuccess = false,
                Message = "OTP is invalid or expired"
            });

        await _userRepository.RegisterAsync(user);
        //_sessionExtensions.Remove($"OTP_{request.Otp}");
        //_sessionExtensions.Remove($"User_{request.Otp}");
        await _redisHelper.RemoveAsync($"OTP_{request.Otp}");
        await _redisHelper.RemoveAsync($"User_{request.Otp}");
        return await Task.FromResult(new VerifyRegisterResponse
        {
            IsSuccess = true,
            Message = "Register successfully"
        });
    }
}