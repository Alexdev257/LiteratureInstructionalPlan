using LIP.Application.CQRS.Query.Role;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleGetAllQueryHandler : IRequestHandler<RoleGetAllQuery, RoleGetAllResponse>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleGetAllQueryHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<RoleGetAllResponse> Handle(RoleGetAllQuery request, CancellationToken cancellationToken)
        {
            var data = await _roleRepository.GetAllAsync(request);

            var response = new RoleGetAllResponse
            {
                IsSuccess = true,
                Data = data.Select(x => new RoleGetResponseDTO
                {
                    RoleId = x.RoleId,
                    RoleName = x.RoleName
                }).ToList(),
                Message = "Get all role success"
            };

            return response;
        }
    }
}