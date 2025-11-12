using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User;

public class UserDeleteCommandHandler : IRequestHandler<UserDeleteCommand, UserDeleteResponse>
{
    private readonly IUserRepository _userRepository;

    public UserDeleteCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDeleteResponse> Handle(UserDeleteCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetAsync(new UserGetQuery { UserId = request.UserId });
        if (user == null)
            return new UserDeleteResponse
            {
                IsSuccess = false,
                Message = "User is not found!"
            };

        var rs = await _userRepository.DeleteAsync(request);
        if (rs)
            return new UserDeleteResponse
            {
                IsSuccess = true,
                Message = "Delete User successfully!"
            };

        return new UserDeleteResponse
        {
            IsSuccess = false,
            Message = "Delete User failed!"
        };
    }
}