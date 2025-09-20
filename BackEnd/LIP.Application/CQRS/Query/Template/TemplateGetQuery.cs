using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Template
{
    public class TemplateGetQuery : IRequest<LIP.Domain.Entities.Template?>
    {
        public int TemplateId { get; set; }
    }
}