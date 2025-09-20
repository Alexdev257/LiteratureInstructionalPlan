using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examtype
{
    public class ExamtypeGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.Examtype>>
    {
        public string? Name { get; set; }
    }
}