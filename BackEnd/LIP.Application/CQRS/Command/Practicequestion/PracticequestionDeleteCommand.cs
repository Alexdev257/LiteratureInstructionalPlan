using MediatR;

namespace LIP.Application.CQRS.Command.Practicequestion
{
    public class PracticequestionDeleteCommand : IRequest<bool>
    {
        public int QuestionId { get; set; }
    }
}