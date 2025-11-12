using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examanswer
{
    public class ExamanswerGetQuery : IRequest<LIP.Domain.Entities.Examanswer?>
    {
        public int AnswerId { get; set; }
    }
}