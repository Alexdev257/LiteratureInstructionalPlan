using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response.ExamType;
using MediatR;

namespace LIP.Application.CQRS.Query.Examtype;

public class GetAllExamTypeQuery : PaginationRequest, IRequest<GetAllExamTypeResponse>
{
    public string? Name { get; set; }
}