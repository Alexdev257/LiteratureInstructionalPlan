using LIP.Application.CQRS.Query.Role;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleGetQueryHandler : IRequestHandler<RoleGetQuery, LIP.Domain.Entities.Role?>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleGetQueryHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<LIP.Domain.Entities.Role?> Handle(RoleGetQuery request, CancellationToken cancellationToken)
        {
            return await _roleRepository.GetAsync(request);
        }
    }
}