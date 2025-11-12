namespace LIP.Application.DTOs.Response.Role;

public class RoleCreateResponse : CommonResponse<RoleCreateResponseDTO>
{
}

public class RoleCreateResponseDTO
{
    public string RoleName { get; set; } = string.Empty;
}