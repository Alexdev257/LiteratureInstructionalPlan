using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateGetAllQueryHandler : IRequestHandler<TemplateGetAllQuery, TemplateGetResponse>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateGetAllQueryHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<TemplateGetResponse> Handle(TemplateGetAllQuery request, CancellationToken cancellationToken)
        {
            var result = await _templateRepository.GetAllAsync(request);
            return new TemplateGetResponse
            {
                IsSuccess = true,
                Message = "Get all templates success",
                Data = result.Select(x => new TemplateGetDTO
                {
                    FilePath = x.FilePath!,
                    Title = x.Title!
                }).ToList()
            };
        }
    }
}