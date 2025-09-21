using System;

namespace LIP.Application.DTOs.Response.Role;

public class RoleCreateResponse : CommonReponse<RoleCreateResponseDTO> { }

public class RoleCreateResponseDTO
{
    public string RoleName { get; set; } = string.Empty;
}
