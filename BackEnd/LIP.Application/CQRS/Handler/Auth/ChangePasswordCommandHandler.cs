using LIP.Application.CQRS.Command.Auth;
using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Auth;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, ChangePasswordResponse>
{
    private readonly IBcryptHelper _bcryptHelper;
    private readonly IUserRepository _userRepository;

    public ChangePasswordCommandHandler(IUserRepository userRepository, IBcryptHelper bcryptHelper)
    {
        _userRepository = userRepository;
        _bcryptHelper = bcryptHelper;
    }

    public async Task<ChangePasswordResponse> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var userList = await _userRepository.GetAllAsync(new UserGetAllQuery { Email = request.Email });
        var user = userList.ToList().FirstOrDefault();
        if (user == null)
            return new ChangePasswordResponse
            {
                IsSuccess = false,
                Message = "Account does not exist!"
            };

        var isPasswordValid = _bcryptHelper.VerifyPassword(request.Password, user.Password);
        if (!isPasswordValid)
            return new ChangePasswordResponse
            {
                IsSuccess = false,
                Message = "Old password is incorrect!"
            };

        if (request.Password == request.NewPassword)
            return new ChangePasswordResponse
            {
                IsSuccess = false,
                Message = "New password must be different from old password!"
            };
        var hasedNewPassword = _bcryptHelper.HashPassword(request.NewPassword);
        var rs = await _userRepository.UpdateAsync(new UserUpdateCommand
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
        });

        if (rs)
            return new ChangePasswordResponse
            {
                IsSuccess = true,
                Message = "Change password successfully!"
            };

        return new ChangePasswordResponse
        {
            IsSuccess = false,
            Message = "Change password failed!"
        };
    }
}