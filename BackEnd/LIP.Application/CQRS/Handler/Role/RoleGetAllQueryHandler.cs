using LIP.Application.CQRS.Query.Role;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleGetAllQueryHandler : IRequestHandler<RoleGetAllQuery, IEnumerable<LIP.Domain.Entities.Role>>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleGetAllQueryHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.Role>> Handle(RoleGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _roleRepository.GetAllAsync(request);
        }
    }
}