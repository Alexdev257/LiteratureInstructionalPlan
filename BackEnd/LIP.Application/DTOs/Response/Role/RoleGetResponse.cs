using System;

namespace LIP.Application.DTOs.Response.Role;

public class RoleGetResponse : CommonReponse<RoleGetResponseDTO>
{

}

public class RoleGetResponseDTO
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = string.Empty;
}
