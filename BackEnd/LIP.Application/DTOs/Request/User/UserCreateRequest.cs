namespace LIP.Application.DTOs.Request.User;

public class UserCreateRequest
{
    public string UserName { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;

    public int? RoleId { get; set; }
    //public DateTime? CreatedAt { get; set; }
}