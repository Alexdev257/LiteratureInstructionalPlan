using MediatR;

namespace LIP.Application.CQRS.Command.Exam
{
    public class ExamDeleteCommand : IRequest<bool>
    {
        public int ExamId { get; set; }
    }
}