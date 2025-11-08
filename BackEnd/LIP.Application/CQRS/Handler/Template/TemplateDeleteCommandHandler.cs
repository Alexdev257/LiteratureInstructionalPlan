using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateDeleteCommandHandler : IRequestHandler<TemplateDeleteCommand, CommonResponse<bool>>
{
    private readonly ICloudinaryUpload _cloudinaryUpload;
    private readonly ITemplateRepository _templateRepository;

    public TemplateDeleteCommandHandler(ITemplateRepository templateRepository, ICloudinaryUpload cloudinaryUpload)
    {
        _templateRepository = templateRepository;
        _cloudinaryUpload = cloudinaryUpload;
    }

    public async Task<CommonResponse<bool>> Handle(TemplateDeleteCommand request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetAsync(new TemplateGetQuery
        {
            TemplateId = request.TemplateId
        });

        var publicId = await _cloudinaryUpload.GetPublicId(result!.FilePath!);

        var isSuccess = await _templateRepository.DeleteAsync(request);

        if (isSuccess)
        {
            await _cloudinaryUpload.DeleteFile(publicId);
            return new CommonResponse<bool>
            {
                IsSuccess = true,
                Message = "Delete template success",
                Data = true
            };
        }

        return new CommonResponse<bool>
        {
            IsSuccess = false,
            Message = "some errors occurred while delete",
            Data = false
        };
    }
}