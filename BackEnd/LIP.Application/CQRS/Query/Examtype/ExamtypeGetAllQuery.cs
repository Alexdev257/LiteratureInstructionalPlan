using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Examtype;

public class ExamtypeGetAllQuery : IRequest<IEnumerable<ExamType>>
{
    public string? Name { get; set; }
}