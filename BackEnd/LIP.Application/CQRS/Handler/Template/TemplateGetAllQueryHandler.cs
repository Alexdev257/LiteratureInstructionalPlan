using LIP.Application.CQRS.Query.Template;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateGetAllQueryHandler : IRequestHandler<TemplateGetAllQuery, IEnumerable<LIP.Domain.Entities.Template>>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateGetAllQueryHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.Template>> Handle(TemplateGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _templateRepository.GetAllAsync(request);
        }
    }
}