using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.Gradelevel
{
    public class GetAllGradeLevelQuery : IRequest<GetAllGradeLevelResponse>
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
}
