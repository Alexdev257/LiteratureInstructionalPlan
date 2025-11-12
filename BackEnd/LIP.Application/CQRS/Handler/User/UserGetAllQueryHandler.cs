using LIP.Application.CQRS.Query.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User;

public class UserGetAllQueryHandler : IRequestHandler<UserGetAllQuery, IEnumerable<Domain.Entities.User>>
{
    private readonly IUserRepository _userRepository;

    public UserGetAllQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<Domain.Entities.User>> Handle(UserGetAllQuery request,
        CancellationToken cancellationToken)
    {
        return await _userRepository.GetAllAsync(request);
    }
}