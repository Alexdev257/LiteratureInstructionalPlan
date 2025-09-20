using LIP.Application.CQRS.Command.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User
{
    public class UserCreateCommandHandler : IRequestHandler<UserCreateCommand, bool>
    {
        private readonly IUserRepository _userRepository;

        public UserCreateCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(UserCreateCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.CreateAsync(request);
        }
    }
}