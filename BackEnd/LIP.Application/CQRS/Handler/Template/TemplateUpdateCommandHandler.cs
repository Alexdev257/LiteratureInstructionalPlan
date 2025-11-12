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

        var result = await _cloudinaryUpload.UploadFileAsync(request.FileStream!, request.FileName);
        if (!string.IsNullOrEmpty(result.Url) && !string.IsNullOrEmpty(result.ViewUrl))
        {
            request.ViewPath = result.ViewUrl;
            request.FilePath = result.Url;

            var isSuccess = await _templateRepository.UpdateAsync(request);
            if (isSuccess)
                return new TemplateUpdateResponse
                {
                    IsSuccess = true,
                    Message = "Update template success",
                    Data = new TemplateCreateResponseDTO
                    {
                        CreatedBy = request.CreatedBy,
                        FilePath = result.Url,
                        ViewPath = result.ViewUrl,
                        Title = request.Title,
                        GradeLevelId = request.GradeLevelId,
                        Price = request.Price
                    }
                };

            return new TemplateUpdateResponse
            {
                IsSuccess = false,
                Message = "some errors occurred while update"
            };
        }

        return new TemplateUpdateResponse
        {
            IsSuccess = false,
            Message = "Error uploading file"
        };
    }
}