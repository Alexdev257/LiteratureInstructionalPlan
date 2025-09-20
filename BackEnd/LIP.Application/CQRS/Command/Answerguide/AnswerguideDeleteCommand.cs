using MediatR;

namespace LIP.Application.CQRS.Command.Answerguide
{
    public class AnswerguideDeleteCommand : IRequest<bool>
    {
        public int AnswerGuideId { get; set; }
    }
}