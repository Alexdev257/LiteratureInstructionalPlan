using LIP.Application.CQRS.Command.Role;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Role
{
    public class RoleUpdateCommandHandler : IRequestHandler<RoleUpdateCommand, RoleUpdateResponse>
    {
        private readonly IRoleRepository _roleRepository;

        public RoleUpdateCommandHandler(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<RoleUpdateResponse> Handle(RoleUpdateCommand request, CancellationToken cancellationToken)
        {
            var result = await _roleRepository.UpdateAsync(request);

            if (result == true) return new RoleUpdateResponse
            {
                Data = new RoleUpdateResponseDTO
                {
                    RoleName = request.RoleName,
                    RoleId = request.RoleId
                },
                IsSuccess = true,
                Message = "Update role success"
            };

            else return new RoleUpdateResponse
            {
                IsSuccess = false,
                Message = "some errors occurred while update"
            };
        }
    }
}