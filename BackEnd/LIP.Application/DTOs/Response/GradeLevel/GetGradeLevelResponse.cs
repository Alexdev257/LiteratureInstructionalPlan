using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.GradeLevel
{
    public class GetGradeLevelResponse : CommonResponse<GetGradeLevelResponseDTO> { }
    public class GetGradeLevelResponseDTO
    {
        public int GradeLevelId { get; set; }
        public string? Name { get; set; } = null!;
    }
}
