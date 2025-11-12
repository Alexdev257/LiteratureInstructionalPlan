using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User;

public class UserCreateCommandHandler : IRequestHandler<UserCreateCommand, UserCreateResponse>
{
    private readonly IBcryptHelper _bcryptHelper;
    private readonly IUserRepository _userRepository;

    public UserCreateCommandHandler(IUserRepository userRepository, IBcryptHelper bcryptHelper)
    {
        _userRepository = userRepository;
        _bcryptHelper = bcryptHelper;
    }

    public async Task<UserCreateResponse> Handle(UserCreateCommand request, CancellationToken cancellationToken)
    {
        var userList = await _userRepository.GetAllAsync(new UserGetAllQuery { Email = request.Email });
        var existEmailUser = userList.ToList().FirstOrDefault();

        if (existEmailUser != null)
            return new UserCreateResponse
            {
                IsSuccess = false,
                Message = "Email has existed in the system already!"
            };

        request.CreatedAt = DateTime.UtcNow;
        request.Password = _bcryptHelper.HashPassword(request.Password);
        var rs = await _userRepository.CreateAsync(request);
        if (rs)
        {
            var curUserList = await _userRepository.GetAllAsync(new UserGetAllQuery());
            var curUser = curUserList.OrderByDescending(u => u.UserId).FirstOrDefault();
            var dto = new UserCreateResponseDTO
            {
                UserId = curUser.UserId,
                UserName = curUser.UserName,
                FullName = curUser.FullName,
                Email = curUser.Email,
                RoleId = curUser.RoleId,
                CreatedAt = curUser.CreatedAt
            };
            return new UserCreateResponse
            {
                IsSuccess = true,
                Data = dto,
                Message = "Create User successfully!"
            };
        }

        return new UserCreateResponse
        {
            IsSuccess = false,
            Message = "Create User failed"
        };
    }
}