using LIP.Application.CQRS.Command.Role;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleDeleteCommandHandler : IRequestHandler<RoleDeleteCommand, bool>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleDeleteCommandHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<bool> Handle(RoleDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _roleRepository.DeleteAsync(request);
        }
    }
}