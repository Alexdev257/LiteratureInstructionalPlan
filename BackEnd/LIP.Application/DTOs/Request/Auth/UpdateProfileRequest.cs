namespace LIP.Application.DTOs.Request.Auth;

public class UpdateProfileRequest
{
    public string UserName { get; set; } = null!;
    public string FullName { get; set; } = null!;
}