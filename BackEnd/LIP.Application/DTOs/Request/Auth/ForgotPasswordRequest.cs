namespace LIP.Application.DTOs.Request.Auth;

public class ForgotPasswordRequest
{
    public string Email { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}