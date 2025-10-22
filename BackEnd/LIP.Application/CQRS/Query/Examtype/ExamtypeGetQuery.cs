using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examtype
{
    public class ExamtypeGetQuery : IRequest<LIP.Domain.Entities.ExamType?>
    {
        public int ExamTypeId { get; set; }
    }
}