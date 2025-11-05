using LIP.Application.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.Exam
{
    public class GetExamResponse : CommonResponse<GetExamResponseDTO> { }

    public class GetExamResponseDTO
    {
        public int ExamId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int DurationMinutes { get; set; }
        public int GradeLevelId { get; set; }
        public int ExamTypeId { get; set; }
        public int MatrixId { get; set; }
        public int CreateByUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<QuestionDTO> Questions { get; set; } = new();
    }
}
