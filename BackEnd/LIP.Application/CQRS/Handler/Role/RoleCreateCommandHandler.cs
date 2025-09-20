using LIP.Application.CQRS.Command.Role;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleCreateCommandHandler : IRequestHandler<RoleCreateCommand, bool>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleCreateCommandHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<bool> Handle(RoleCreateCommand request, CancellationToken cancellationToken)
        {
            return await _roleRepository.CreateAsync(request);
        }
    }
}