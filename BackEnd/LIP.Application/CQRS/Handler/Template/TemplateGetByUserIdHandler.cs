using LIP.Application.CQRS.Query.Template;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateGetByUserIdHandler : IRequestHandler<TemplateGetByUserId, TemplateGetResponse>
{
    private readonly ITemplateRepository _templateRepository;
    private readonly ITemplatebookingRepository _templatebookingRepository;

    public TemplateGetByUserIdHandler(ITemplateRepository templateRepository, ITemplatebookingRepository templatebookingRepository)
    {
        _templateRepository = templateRepository;
        _templatebookingRepository = templatebookingRepository;
    }

    public async Task<TemplateGetResponse> Handle(TemplateGetByUserId request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetTemplateByUserIdAsync(request);
        var result2 = await _templatebookingRepository.GetByUserIdAsync(new TemplatebookingGetByUserIdQuery
        {
            UserId = request.UserId
        });

        var response = new TemplateGetResponse();
        response.Data = new List<TemplateGetDTO>();

        foreach (var entity in result2)
        {
            if (entity.TemplateId is not null)
            {
                var addedTemplate = await _templateRepository.GetAsync(new TemplateGetQuery
                {
                    TemplateId = (int)entity.TemplateId
                });
                
                response.Data!.Add( new TemplateGetDTO
                {
                    FilePath = addedTemplate!.FilePath!,
                    Title = addedTemplate.Title!,
                });
            }
        }
        
        foreach (var entity in result)
        {
            response.Data!.Add( new TemplateGetDTO
            {
                FilePath =  entity.FilePath!,
                Title = entity.Title!,
            });
        }
        
        response.IsSuccess = true;
        response.Message = "Get templates by user id success";
        return response;
    }
}