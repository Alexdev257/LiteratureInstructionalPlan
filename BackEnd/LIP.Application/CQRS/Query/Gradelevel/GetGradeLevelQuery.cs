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
    public class GetGradeLevelQuery : IRequest<GetGradeLevelResponse>, IValidatable<GetGradeLevelResponse>
    {
        public int GradeLevelId { get; set; }

        public Task<GetGradeLevelResponse> ValidateAsync()
        {
            GetGradeLevelResponse response = new GetGradeLevelResponse();
            if (string.IsNullOrEmpty(this.GradeLevelId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.GradeLevelId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be an integer!"
                });
            }
            if (this.GradeLevelId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be larger than 0!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
