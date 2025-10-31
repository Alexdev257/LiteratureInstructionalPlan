using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.PracticeQuestion
{
    public class PracticeQuestionCreateRequest
    {
        //public int QuestionId { get; set; }

        public string? Content { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        public string? Answer { get; set; }

        public int? GradeLevelId { get; set; }

        public int? CreatedBy { get; set; }

        //public DateTime? CreatedAt { get; set; }

        //public bool IsDeleted { get; set; }

        //public DateTime DeletedAt { get; set; }
    }
}
