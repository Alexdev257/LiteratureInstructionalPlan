using LIP.Application.DTOs.Response.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Helpers
{
    public interface IGoogleOAuthHelper
    {
        Task<GoogleTokenValidationResponse> ValidateGoogleTokenAsync(string googleToken);
    }
}
