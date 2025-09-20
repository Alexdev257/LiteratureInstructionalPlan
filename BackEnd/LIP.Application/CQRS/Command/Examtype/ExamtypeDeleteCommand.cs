using MediatR;

namespace LIP.Application.CQRS.Command.Examtype
{
    public class ExamtypeDeleteCommand : IRequest<bool>
    {
        public int ExamTypeId { get; set; }
    }
}