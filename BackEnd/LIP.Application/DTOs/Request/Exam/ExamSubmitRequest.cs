using LIP.Application.CQRS.Command.Exam;
using LIP.Application.DTOs.Request.PracticeQuestion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Exam
{
    public class ExamSubmitRequest
    {
        public int AttemptId { get; set; }
        public List<SubmitAnswerDTO> Answers { get; set; } = new();
    }

    public class SubmitAnswerDTO
    {
        public int QuestionId { get; set; }
        public List<AnswerOption>? AnswerContent { get; set; } = new();
    }
}
