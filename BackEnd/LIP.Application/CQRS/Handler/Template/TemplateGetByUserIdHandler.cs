using LIP.Application.CQRS.Query.Template;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateGetByUserIdHandler : IRequestHandler<TemplateGetByUserId, TemplateGetResponse>
{
    private readonly ITemplatebookingRepository _templatebookingRepository;
    private readonly ITemplateRepository _templateRepository;

    public TemplateGetByUserIdHandler(ITemplateRepository templateRepository,
        ITemplatebookingRepository templatebookingRepository)
    {
        _templateRepository = templateRepository;
        _templatebookingRepository = templatebookingRepository;
    }

    public async Task<TemplateGetResponse> Handle(TemplateGetByUserId request, CancellationToken cancellationToken)
    {
        var createdTemplates = await _templateRepository.GetTemplateByUserIdAsync(request);

        var bookings = await _templatebookingRepository.GetByUserIdAsync(new TemplatebookingGetByUserIdQuery
        {
            UserId = request.UserId
        });

        var bookedTemplateIds = bookings
            .Where(b => b.TemplateId is not null)
            .Select(b => (int)b.TemplateId!)
            .Distinct()
            .ToList();

        var bookedTemplates = new List<Domain.Entities.Template>();
        if (bookedTemplateIds.Any()) bookedTemplates = await _templateRepository.GetByIdsAsync(bookedTemplateIds);


        var response = new TemplateGetResponse
        {
            Data = new List<TemplateGetDTO>()
        };

        var tasks = bookedTemplates.Select(async x =>
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

        var tasks2 = createdTemplates.Select(async x =>
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
        
        response.Data.AddRange((await Task.WhenAll(tasks)).ToList());
        response.Data.AddRange((await Task.WhenAll(tasks2)).ToList());

        response.IsSuccess = true;
        response.Message = "Get templates by user id success";
        return response;
    }
}