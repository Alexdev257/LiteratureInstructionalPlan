using LIP.Application.CQRS.Query.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User;

public class UserGetQueryHandler : IRequestHandler<UserGetQuery, Domain.Entities.User?>
{
    private readonly IUserRepository _userRepository;

    public UserGetQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Domain.Entities.User?> Handle(UserGetQuery request, CancellationToken cancellationToken)
    {
        return await _userRepository.GetAsync(request);
    }
}