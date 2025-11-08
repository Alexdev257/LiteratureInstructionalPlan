namespace LIP.Application.DTOs.Request.Auth;

public class VerifyChangeEmailRequest
{
    public string NewEmail { get; set; } = null!;
    public string OTP { get; set; } = null!;
}