using MediatR;

namespace LIP.Application.CQRS.Command.Submission
{
    public class SubmissionDeleteCommand : IRequest<bool>
    {
        public int SubmissionId { get; set; }
    }
}