namespace LIP.Application.DTOs.Response.Auth;

public class GoogleTokenValidationResponse
{
    public bool IsValid { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Picture { get; set; } = string.Empty;
    public bool EmailVerified { get; set; }
    public string ErrorMessage { get; set; } = string.Empty;
}