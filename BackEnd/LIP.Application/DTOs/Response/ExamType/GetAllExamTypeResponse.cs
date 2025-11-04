using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.ExamType
{
    public class GetAllExamTypeResponse : CommonReponse<PaginationResponse<GetAllExamTypeResponseDTO>> { }

    public class GetAllExamTypeResponseDTO
    {
        public int ExamTypeId { get; set; }
        public string? Name { get; set; }
    }
}
