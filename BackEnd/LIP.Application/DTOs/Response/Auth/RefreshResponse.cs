namespace LIP.Application.DTOs.Response.Auth;

public class RefreshResponse : CommonResponse<RefreshResponseDTO>
{
}

public class RefreshResponseDTO
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}