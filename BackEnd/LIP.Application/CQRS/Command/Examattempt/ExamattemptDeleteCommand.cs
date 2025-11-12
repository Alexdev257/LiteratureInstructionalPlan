using MediatR;

namespace LIP.Application.CQRS.Command.Examattempt
{
    public class ExamattemptDeleteCommand : IRequest<bool>
    {
        public int AttemptId { get; set; }
    }
}