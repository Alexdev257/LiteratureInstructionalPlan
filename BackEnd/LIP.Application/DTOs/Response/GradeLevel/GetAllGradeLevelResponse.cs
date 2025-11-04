using LIP.Application.DTOs.Response.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.GradeLevel
{
    public class GetAllGradeLevelResponse : CommonReponse<PaginationResponse<GetAllGradeLevelResponseDTO>> { }

    public class GetAllGradeLevelResponseDTO
    {
        public int GradeLevelId { get; set; }
        public string? Name { get; set; } = null!;
    }
}
