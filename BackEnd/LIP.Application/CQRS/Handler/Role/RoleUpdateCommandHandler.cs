using LIP.Application.CQRS.Command.Role;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleUpdateCommandHandler : IRequestHandler<RoleUpdateCommand, bool>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleUpdateCommandHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<bool> Handle(RoleUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _roleRepository.UpdateAsync(request);
        }
    }
}