using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examtype
{
    public class ExamtypeGetQuery : IRequest<LIP.Domain.Entities.Examtype?>
    {
        public int ExamTypeId { get; set; }
    }
}