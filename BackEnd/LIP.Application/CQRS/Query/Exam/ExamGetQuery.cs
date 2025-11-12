using MediatR;

namespace LIP.Application.CQRS.Query.Exam;

public class ExamGetQuery : IRequest<Domain.Entities.Exam?>
{
    public int ExamId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}