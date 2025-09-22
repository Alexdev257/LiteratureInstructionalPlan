using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Auth
{
    public class LoginGoogleRequest
    {
        public string GoogleToken { get; set; } = null!;
    }
}
