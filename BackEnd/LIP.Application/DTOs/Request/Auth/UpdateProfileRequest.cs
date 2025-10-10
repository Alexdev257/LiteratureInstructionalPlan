using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Auth
{
    public class UpdateProfileRequest
    {
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
    }
}
