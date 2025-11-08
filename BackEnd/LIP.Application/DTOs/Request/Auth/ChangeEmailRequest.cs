namespace LIP.Application.DTOs.Request.Auth;

public class ChangeEmailRequest
{
    public int UserId { get; set; }
    public string NewEmail { get; set; } = null!;
}