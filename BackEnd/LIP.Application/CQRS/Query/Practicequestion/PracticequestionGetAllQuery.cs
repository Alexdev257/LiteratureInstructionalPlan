using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Practicequestion
{
    public class PracticequestionGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.Practicequestion>>
    {
        public string? QuestionType { get; set; }
        public int? GradeLevelId { get; set; }
        public int? SeriesId { get; set; }
        public int? CreatedBy { get; set; }
    }
}