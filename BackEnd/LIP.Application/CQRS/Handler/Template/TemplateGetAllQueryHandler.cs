using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateGetAllQueryHandler : IRequestHandler<TemplateGetAllQuery, TemplateGetResponse>
{
    private readonly ITemplatebookingRepository _templatebookingRepository;
    private readonly ITemplateRepository _templateRepository;

    public TemplateGetAllQueryHandler(ITemplateRepository templateRepository,
        ITemplatebookingRepository templatebookingRepository)
    {
        _templateRepository = templateRepository;
        _templatebookingRepository = templatebookingRepository;
    }

    public async Task<TemplateGetResponse> Handle(TemplateGetAllQuery request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetAllAsync(request);

        var tasks = result.Select(async x =>
        {
            var saledCount = (await _templatebookingRepository.GetByTemplateIdAsync(x.TemplateId)).Count();

            return new TemplateGetDTO
            {
                FilePath = x.FilePath!,
                Title = x.Title!,
                ViewPath = x.ViewPath!,
                CreatedAt = x.CreatedAt,
                CreatedBy = x.CreatedBy,
                GradeLevelId = x.GradeLevelId,
                Price = x.Price,
                TemplateId = x.TemplateId,
                Saled = saledCount // Gán count
            };
        });

        var data = (await Task.WhenAll(tasks)).ToList();

        return new TemplateGetResponse
        {
            IsSuccess = true,
            Message = "Get all templates success",
            Data = data
        };
    }
}