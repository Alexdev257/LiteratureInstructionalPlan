using MediatR;

namespace LIP.Application.CQRS.Command.Answerguide
{
    public class AnswerguideCreateCommand : IRequest<bool>
    {
        public int? ExamId { get; set; }
        public string? KeyPoints { get; set; }
        public int? MaxScore { get; set; }
    }
}