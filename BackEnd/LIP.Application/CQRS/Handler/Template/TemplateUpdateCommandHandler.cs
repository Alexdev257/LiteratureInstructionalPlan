using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateUpdateCommandHandler : IRequestHandler<TemplateUpdateCommand, TemplateUpdateResponse>
{
    private readonly ICloudinaryUpload _cloudinaryUpload;
    private readonly ITemplateRepository _templateRepository;

    public TemplateUpdateCommandHandler(ITemplateRepository templateRepository, ICloudinaryUpload cloudinaryUpload)
    {
        _templateRepository = templateRepository;
        _cloudinaryUpload = cloudinaryUpload;
    }

    public async Task<TemplateUpdateResponse> Handle(TemplateUpdateCommand request, CancellationToken cancellationToken)
    {
        var template = await _templateRepository.GetAsync(new TemplateGetQuery
        {
            TemplateId = request.TemplateId
        });

        if (template == null)
            return new TemplateUpdateResponse
            {
                IsSuccess = false,
                Message = "Template not found"
            };


        var templateUpdated = await _templateRepository.UpdateAsync(request);
        if (templateUpdated is not null)
            return new TemplateUpdateResponse
            {
                IsSuccess = true,
                Message = "Update template success",
                Data = new TemplateCreateResponseDTO
                {
                    FilePath = templateUpdated.FilePath,
                    ViewPath =  templateUpdated.ViewPath,
                    Title = request.Title,
                    GradeLevelId = request.GradeLevelId,
                    Price = request.Price,
                    CreatedBy = templateUpdated.CreatedBy
                }
            };

        return new TemplateUpdateResponse
        {
            IsSuccess = false,
            Message = "some errors occurred while update"
        };
    }
}