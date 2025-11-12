namespace LIP.Application.DTOs.Response.Auth;

public class LoginGoogleResponse : CommonResponse<LoginGoogleResponseDTO>
{
}

public class LoginGoogleResponseDTO
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}