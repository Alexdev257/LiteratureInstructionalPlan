namespace LIP.Application.DTOs.Response.User;

public class UserCreateResponse : CommonResponse<UserCreateResponseDTO>
{
}

public class UserCreateResponseDTO
{
    public int UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public int? RoleId { get; set; }
    public DateTime? CreatedAt { get; set; }
}