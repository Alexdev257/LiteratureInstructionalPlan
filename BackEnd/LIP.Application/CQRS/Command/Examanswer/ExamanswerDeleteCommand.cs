using MediatR;

namespace LIP.Application.CQRS.Command.Examanswer;

public class ExamanswerDeleteCommand : IRequest<bool>
{
    public int AnswerId { get; set; }
}