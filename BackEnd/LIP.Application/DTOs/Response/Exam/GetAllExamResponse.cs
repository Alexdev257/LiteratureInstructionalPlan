using LIP.Application.DTOs.Request.PracticeQuestion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.Exam
{
    public class GetAllExamResponse : CommonReponse<PaginationResponse<GetAllExamResponseDTO>> { }
    
    public class GetAllExamResponseDTO
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

    public class QuestionDTO
    {
        public int QuestionId { get; set; }

        public string? Content { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        public List<AnswerOption>? Answer { get; set; }

        public List<AnswerOption>? CorrectAnswer { get; set; }

        public int? GradeLevelId { get; set; }

        public int? CreatedByNavigationUserId { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
}
