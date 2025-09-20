using MediatR;

namespace LIP.Application.CQRS.Command.Answerguide
{
    public class AnswerguideUpdateCommand : IRequest<bool>
    {
        public int AnswerGuideId { get; set; }
        public int? ExamId { get; set; }
        public string? KeyPoints { get; set; }
        public int? MaxScore { get; set; }
    }
}