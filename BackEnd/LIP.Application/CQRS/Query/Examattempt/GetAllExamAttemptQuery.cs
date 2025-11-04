using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIP.Application.DTOs.Request;

namespace LIP.Application.CQRS.Query.Examattempt
{
    public class GetAllExamAttemptQuery : PaginationRequest, IRequest<GetAllExamAttemptResponse>, IValidatable<GetAllExamAttemptResponse>
    {
        public int? ExamId { get; set; }
        public int? UserId { get; set; }
        public string? Status { get; set; }
        public bool? IsAdmin { get; set; } = false!;

        public Task<GetAllExamAttemptResponse> ValidateAsync()
        {
            GetAllExamAttemptResponse response = new GetAllExamAttemptResponse();
            if(this.ExamId.ToString() != null)
            {
                if(this.ExamId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "ExamId",
                        Detail = "ExamId must be larger than 0"
                    });
                }
            }
            if (this.UserId.ToString() != null)
            {
                if (this.UserId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "UserId",
                        Detail = "UserId must be larger than 0"
                    });
                }
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
