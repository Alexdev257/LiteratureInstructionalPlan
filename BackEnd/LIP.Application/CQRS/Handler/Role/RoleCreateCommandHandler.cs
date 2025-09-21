using LIP.Application.CQRS.Command.Role;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleCreateCommandHandler : IRequestHandler<RoleCreateCommand, RoleCreateResponse>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleCreateCommandHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<RoleCreateResponse> Handle(RoleCreateCommand request, CancellationToken cancellationToken)
        {
            var result = await _roleRepository.CreateAsync(request);

            if (result) return new RoleCreateResponse
            {
                IsSuccess = true,
                Message = "Create role success",
                Data = new RoleCreateResponseDTO
                {
                    RoleName = request.RoleName
                }
            };

            else return new RoleCreateResponse
            {
                IsSuccess = false,
                Message = "some errors occurred while update"
            };
        }
    }
}