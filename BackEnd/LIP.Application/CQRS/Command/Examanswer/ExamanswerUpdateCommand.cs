using MediatR;

namespace LIP.Application.CQRS.Command.Examanswer
{
    public class ExamanswerUpdateCommand : IRequest<bool>
    {
        public int AnswerId { get; set; }
        public int? AttemptId { get; set; }
        public int? QuestionId { get; set; }
        public string? AnswerContent { get; set; }
    }
}