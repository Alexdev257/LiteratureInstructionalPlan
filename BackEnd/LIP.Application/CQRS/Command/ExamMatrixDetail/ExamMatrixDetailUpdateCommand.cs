using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.ExamMatrixDetail
{
    public class ExamMatrixDetailUpdateCommand
    {
        public int ExamMatrixDetailId { get; set; }

        public string? LessonName { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        public int? Quantity { get; set; }

        public decimal? ScorePerQuestion { get; set; }

        public int? ExamMatricId { get; set; }

        //public virtual ExamMatrix? ExamMatrix { get; set; }
    }
}
