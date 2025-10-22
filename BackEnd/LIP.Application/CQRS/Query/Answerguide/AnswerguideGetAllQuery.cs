using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Answerguide
{
    public class AnswerguideGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.AnswerGuide>>
    {
        public int? ExamId { get; set; }
        public int? MaxScore { get; set; }
    }
}