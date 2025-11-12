using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response.GradeLevel;
using MediatR;

namespace LIP.Application.CQRS.Query.Gradelevel;

public class GetAllGradeLevelQuery : PaginationRequest, IRequest<GetAllGradeLevelResponse>
{
    public string? Name { get; set; }

    //public Task<GetAllGradeLevelResponse> ValidateAsync()
    //{
    //    GetAllGradeLevelResponse response = new GetAllGradeLevelResponse();
    //    if(string.IsNullOrEmpty(Name))
    //    {
    //        response.ListErrors.Add(new Errors
    //        {
    //            Field = "Name",
    //            Detail = "Name is not null or empty!"
    //        });
    //    }
    //    if (response.ListErrors.Count > 0) response.IsSuccess = false;
    //    return Task.FromResult(response);
    //}
}