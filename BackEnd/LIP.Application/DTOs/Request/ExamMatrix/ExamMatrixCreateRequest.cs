using LIP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.ExamMatrix
{
    public class ExamMatrixCreateRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public List<ExamMatrixDetailDTO> Details { get; set; }
    }

    public class ExamMatrixDetailDTO
    {
        public string? LessonName { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        public int? Quantity { get; set; }

        public decimal? ScorePerQuestion { get; set; }

        //public int? ExamMatricId { get; set; }
    }
}
