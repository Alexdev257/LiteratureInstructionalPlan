using MediatR;

namespace LIP.Application.CQRS.Command.Examtype
{
    public class ExamtypeCreateCommand : IRequest<bool>
    {
        public string? Name { get; set; }
    }
}