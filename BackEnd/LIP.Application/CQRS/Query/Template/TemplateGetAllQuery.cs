using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Template
{
    public class TemplateGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.Template>>
    {
        public int? GradeLevelId { get; set; }
        public int? SeriesId { get; set; }
        public int? CreatedBy { get; set; }
    }
}