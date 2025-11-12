using Google.Apis.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using Microsoft.Extensions.Configuration;

namespace LIP.Infrastructure.Implements.Helpers;

public class GoogleOAuthHelper : IGoogleOAuthHelper
{
    private readonly IConfiguration _configuration;

    public GoogleOAuthHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<GoogleTokenValidationResponse> ValidateGoogleTokenAsync(string googleToken)
    {
        var ClientID = _configuration["GoogleOAuth:ClientID"] ?? "";
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> { ClientID }
            };
            var payloads = await GoogleJsonWebSignature.ValidateAsync(googleToken, settings);

            if (payloads == null)
                return new GoogleTokenValidationResponse
                {
                    IsValid = false,
                    ErrorMessage = "Invalid or expired Google token"
                };

            return new GoogleTokenValidationResponse
            {
                IsValid = true,
                Email = payloads.Email,
                Name = payloads.Name,
                Picture = payloads.Picture,
                EmailVerified = payloads.EmailVerified
            };
        }
        catch (Exception ex)
        {
            return new GoogleTokenValidationResponse
            {
                IsValid = false,
                ErrorMessage = $"Google token validation failed: {ex.Message}"
            };
        }
    }
}