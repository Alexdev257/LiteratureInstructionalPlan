using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Examtype;

public class ExamtypeGetQuery : IRequest<ExamType?>
{
    public int ExamTypeId { get; set; }
}