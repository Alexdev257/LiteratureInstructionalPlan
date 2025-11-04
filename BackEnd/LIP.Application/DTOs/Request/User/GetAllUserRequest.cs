using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.User
{
    public class GetAllUserRequest : PaginationRequest
    {
        public int? RoleId { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public bool? IsAdmin { get; set; } = false!;
    }
}
