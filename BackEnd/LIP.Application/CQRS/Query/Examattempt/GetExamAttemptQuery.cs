using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.Examattempt
{
    public class GetExamAttemptQuery : IRequest<GetExamAttemptResponse>, IValidatable<GetExamAttemptResponse>
    {
        public int AttemptId { get; set; }
        public bool? IsAdmin { get; set; } = false!;

        public Task<GetExamAttemptResponse> ValidateAsync()
        {
            GetExamAttemptResponse response = new GetExamAttemptResponse();
            if (this.AttemptId.ToString() != null)
            {
                if (this.AttemptId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "ExamId",
                        Detail = "ExamId must be larger than 0"
                    });
                }
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
