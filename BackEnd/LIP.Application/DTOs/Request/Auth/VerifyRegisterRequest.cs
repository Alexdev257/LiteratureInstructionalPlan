namespace LIP.Application.DTOs.Request.Auth;

public class VerifyRegisterRequest
{
    public string Email { get; set; } = null!;
    public string Otp { get; set; } = null!;
}