using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateGetQueryHandler : IRequestHandler<TemplateGetQuery, TemplateGetByIdResponse>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateGetQueryHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<TemplateGetByIdResponse> Handle(TemplateGetQuery request, CancellationToken cancellationToken)
        {
            var result = await _templateRepository.GetAsync(request);
            if (result != null)
            {
                return new TemplateGetByIdResponse
                {
                    IsSuccess = true,
                    Message = "Get template by id success",
                    Data = new TemplateGetDTO
                    {
                        FilePath = result.FilePath!,
                        Title = result.Title!,
                    }
                };
            }
            else
            {
                return new TemplateGetByIdResponse
                {
                    IsSuccess = false,
                    Message = "Template not found"
                };
            }
        }
    }
}