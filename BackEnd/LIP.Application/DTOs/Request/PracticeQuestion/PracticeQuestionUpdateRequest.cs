using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.PracticeQuestion
{
    public class PracticeQuestionUpdateRequest
    {
        public string? Content { get; set; }
        public string? QuestionType { get; set; }
        public string? Difficulty { get; set; }
        //public string? Answer { get; set; }
        public List<AnswerOption>? Answer { get; set; }
        public List<AnswerOption>? CorrectAnswer { get; set; }
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
    }
}
