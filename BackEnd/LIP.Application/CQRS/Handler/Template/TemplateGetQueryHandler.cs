using LIP.Application.CQRS.Query.Template;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateGetQueryHandler : IRequestHandler<TemplateGetQuery, LIP.Domain.Entities.Template?>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateGetQueryHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<LIP.Domain.Entities.Template?> Handle(TemplateGetQuery request, CancellationToken cancellationToken)
        {
            return await _templateRepository.GetAsync(request);
        }
    }
}