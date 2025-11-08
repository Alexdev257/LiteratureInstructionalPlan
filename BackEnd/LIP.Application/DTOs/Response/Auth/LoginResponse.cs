namespace LIP.Application.DTOs.Response.Auth;

public class LoginResponse : CommonResponse<LoginResponseDTO>
{
}

public class LoginResponseDTO
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}