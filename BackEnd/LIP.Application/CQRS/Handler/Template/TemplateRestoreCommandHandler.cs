using LIP.Application.CQRS.Command.Template;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template;

public class TemplateRestoreCommandHandler : IRequestHandler<TemplateRestoreCommand, CommonResponse<bool>>
{
    private readonly ITemplateRepository _templateRepository;

    public TemplateRestoreCommandHandler(ITemplateRepository templateRepository)
    {
        _templateRepository = templateRepository;
    }

    public async Task<CommonResponse<bool>> Handle(TemplateRestoreCommand request, CancellationToken cancellationToken)
    {
        var result = await _templateRepository.RestoreAsync(request);

        if (result)
            return new CommonResponse<bool>
            {
                Data = result,
                IsSuccess = true,
                Message = "Restore template success"
            };
        return new CommonResponse<bool>
        {
            Data = result,
            IsSuccess = false,
            Message = "Some errors occurred while restore"
        };
    }
}