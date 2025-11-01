using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.ExamType
{
    public class GetExamTypeResponse : CommonReponse<GetExamTypeResponseDTO> { }

    public class GetExamTypeResponseDTO
    {
        public int ExamTypeId { get; set; }
        public string? Name { get; set; }
    }
}
