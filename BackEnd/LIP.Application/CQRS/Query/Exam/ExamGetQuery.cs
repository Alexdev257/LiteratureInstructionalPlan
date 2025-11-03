using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Exam
{
    public class ExamGetQuery : IRequest<LIP.Domain.Entities.Exam?>
    {
        public int ExamId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}