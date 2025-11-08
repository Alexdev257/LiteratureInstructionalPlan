using LIP.Application.DTOs.Response.Auth;

namespace LIP.Application.Interface.Helpers;

public interface IGoogleOAuthHelper
{
    Task<GoogleTokenValidationResponse> ValidateGoogleTokenAsync(string googleToken);
}