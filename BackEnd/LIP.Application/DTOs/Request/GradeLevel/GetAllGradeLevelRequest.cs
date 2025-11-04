using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.GradeLevel
{
    public class GetAllGradeLevelRequest : PaginationRequest
    {
        public string? Name { get; set; } = null!;
    }
}
