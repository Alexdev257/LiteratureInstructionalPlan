using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Auth
{
    public class VerifyForgotPasswordRequest
    {
        public string Email { get; set; } = null!;
        public string OTP { get; set; } = null!;
    }
}
