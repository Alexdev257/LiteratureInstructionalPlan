namespace LIP.Application.DTOs.Response.Role;

public class RoleGetResponse : CommonResponse<RoleGetResponseDTO>
{
}

public class RoleGetResponseDTO
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = string.Empty;
}