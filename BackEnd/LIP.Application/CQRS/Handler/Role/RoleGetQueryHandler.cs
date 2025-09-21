using LIP.Application.CQRS.Query.Role;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleGetQueryHandler : IRequestHandler<RoleGetQuery, RoleGetResponse>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleGetQueryHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<RoleGetResponse> Handle(RoleGetQuery request, CancellationToken cancellationToken)
        {
            var result = await _roleRepository.GetAsync(request);

            if (result == null)
            {
                return new RoleGetResponse
                {
                    IsSuccess = false,
                    Message = "Do not have data",
                    Data = null
                };
            }

            return new RoleGetResponse
            {
                IsSuccess = true,
                Message = "Get role success",
                Data = new RoleGetResponseDTO
                {
                    RoleId = result.RoleId,
                    RoleName = result.RoleName
                }
            };
        }
    }
}