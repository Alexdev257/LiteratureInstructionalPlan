using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response.Template;
using MediatR;

namespace LIP.Application.CQRS.Query.Template;

public class TemplateGetAllQuery : PaginationRequest, IRequest<TemplateGetResponse>
{
}