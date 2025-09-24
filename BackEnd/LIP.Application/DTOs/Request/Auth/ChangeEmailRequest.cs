using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Auth
{
    public class ChangeEmailRequest
    {
        public int UserId { get; set; }
        public string NewEmail { get; set; } = null!;
    }
}
