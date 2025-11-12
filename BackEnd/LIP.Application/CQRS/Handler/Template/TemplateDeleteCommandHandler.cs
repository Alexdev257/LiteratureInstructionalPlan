using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateDeleteCommandHandler : IRequestHandler<TemplateDeleteCommand, CommonResponse<bool>>
{
    private readonly ITemplateRepository _templateRepository;

    public TemplateDeleteCommandHandler(ITemplateRepository templateRepository, ICloudinaryUpload cloudinaryUpload)
    {
        _templateRepository = templateRepository;
    }

    public async Task<CommonResponse<bool>> Handle(TemplateDeleteCommand request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.GetAsync(new TemplateGetQuery
        {
            TemplateId = request.TemplateId
        });

        var isSuccess = await _templateRepository.DeleteAsync(request);

        if (isSuccess)
            return new CommonResponse<bool>
            {
                IsSuccess = true,
                Message = "Delete template success",
                Data = true
            };

        return new CommonResponse<bool>
        {
            IsSuccess = false,
            Message = "some errors occurred while delete",
            Data = false
        };
    }
}