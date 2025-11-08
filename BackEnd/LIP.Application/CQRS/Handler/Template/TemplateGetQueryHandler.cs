using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateGetQueryHandler : IRequestHandler<TemplateGetQuery, TemplateGetByIdResponse>
{
    private readonly ITemplateRepository _templateRepository;
    private readonly ITemplatebookingRepository _templatebookingRepository;

    public TemplateGetQueryHandler(ITemplateRepository templateRepository, ITemplatebookingRepository templatebookingRepository)
    {
        _templateRepository = templateRepository;
        _templatebookingRepository = templatebookingRepository;
    }

    public async Task<TemplateGetByIdResponse> Handle(TemplateGetQuery request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetAsync(request);
        if (result != null)
        {

            var saledCount = (await _templatebookingRepository.GetByTemplateIdAsync(result.TemplateId)).Count();

            return new TemplateGetByIdResponse
            {
                IsSuccess = true,
                Message = "Get template by id success",
                Data = new TemplateGetDTO
                {
                    FilePath = result.FilePath!,
                    Title = result.Title!,
                    ViewPath = result.ViewPath!,
                    CreatedAt = result.CreatedAt,
                    CreatedBy = result.CreatedBy,
                    GradeLevelId = result.GradeLevelId,
                    Price = result.Price,
                    TemplateId = result.TemplateId,
                    Saled = saledCount // Gán count
                }
            };
        }

        return new TemplateGetByIdResponse
        {
            IsSuccess = false,
            Message = "Template not found"
        };
    }
}