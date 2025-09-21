using System;

namespace LIP.Application.DTOs.Response.Role;

public class RoleUpdateResponse : CommonReponse<RoleUpdateResponseDTO>
{

}

public class RoleUpdateResponseDTO
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = string.Empty;
}
