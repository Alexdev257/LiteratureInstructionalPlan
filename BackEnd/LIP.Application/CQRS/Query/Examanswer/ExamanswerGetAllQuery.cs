using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examanswer
{
    public class ExamanswerGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.ExamAnswer>>
    {
        public int? AttemptId { get; set; }
        public int? QuestionId { get; set; }
    }
}