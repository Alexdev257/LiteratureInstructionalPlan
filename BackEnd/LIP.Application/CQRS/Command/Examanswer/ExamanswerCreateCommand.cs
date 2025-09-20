using MediatR;

namespace LIP.Application.CQRS.Command.Examanswer
{
    public class ExamanswerCreateCommand : IRequest<bool>
    {
        public int? AttemptId { get; set; }
        public int? QuestionId { get; set; }
        public string? AnswerContent { get; set; }
    }
}