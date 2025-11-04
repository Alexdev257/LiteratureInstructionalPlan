using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.Exam
{
    public class GetExamQuery : IRequest<GetExamResponse>, IValidatable<GetExamResponse>
    {
        public int ExamId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
        public bool? IsShowCorrectAnswer { get; set; } = false!;

        public Task<GetExamResponse> ValidateAsync()
        {
            GetExamResponse response = new GetExamResponse();
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
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
