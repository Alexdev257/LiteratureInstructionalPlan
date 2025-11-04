using LIP.Application.DTOs.Request.ExamMatrix;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.ExamMatrix
{
    public class ExamMatrixGetAllResponse : CommonReponse<PaginationResponse<ExamMatrixGetAllResponseDTO>> { }

    public class ExamMatrixGetAllResponseDTO
    {
        public int MatrixId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public List<ExamMatrixDetailResponseDTO> Details { get; set; }
    }

    public class ExamMatrixDetailResponseDTO
    {
        public int ExamMatrixDetailId { get; set; }

        public string? LessonName { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        public int? Quantity { get; set; }

        public decimal? ScorePerQuestion { get; set; }
    }
}
