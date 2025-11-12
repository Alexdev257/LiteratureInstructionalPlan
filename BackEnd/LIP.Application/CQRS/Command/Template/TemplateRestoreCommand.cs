using LIP.Application.DTOs.Response;
using MediatR;

namespace LIP.Application.CQRS.Command.Template;

public class TemplateRestoreCommand : IRequest<CommonResponse<bool>>
{
    public int TemplateId { get; set; }
}