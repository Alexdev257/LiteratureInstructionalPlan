using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.Role;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User;

public class UserUpdateCommandHandler : IRequestHandler<UserUpdateCommand, UserUpdateResponse>
{
    private readonly IRoleRepository _roleRepository;
    private readonly IUserRepository _userRepository;

    public UserUpdateCommandHandler(IUserRepository userRepository, IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
    }

    //public async Task<bool> Handle(UserUpdateCommand request, CancellationToken cancellationToken)
    //{
    //    return await _userRepository.UpdateAsync(request);
    //}

    public async Task<UserUpdateResponse> Handle(UserUpdateCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetAsync(new UserGetQuery { UserId = request.UserId });
        if (user == null)
            return new UserUpdateResponse
            {
                IsSuccess = false,
                Message = "User is not found!"
            };
        request.Password = user.Password; // keep the old password if not changed
        request.CreatedAt = user.CreatedAt; // keep the old created at
        request.IsDeleted = user.IsDeleted; // keep the old is deleted status
        request.DeletedAt = user.DeletedAt; // keep the old deleted at
        var role = await _roleRepository.GetAsync(new RoleGetQuery { RoleId = request.RoleId.Value });
        if (role == null)
            return new UserUpdateResponse
            {
                IsSuccess = false,
                Message = "Role is not found!"
            };
        var rs = await _userRepository.UpdateAsync(request);
        if (rs)
            return new UserUpdateResponse
            {
                IsSuccess = true,
                Message = "Update User successfully!"
            };

        return new UserUpdateResponse
        {
            IsSuccess = false,
            Message = "Update User failed!"
        };
    }
}