using LIP.Application.DTOs.Response.Exam;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Exam
{
    public class ExamStartCommand : IRequest<ExamStartResponse>, IValidatable<ExamStartResponse>
    {
        public int ExamId { get; set; }

        public int UserId { get; set; }

        public Task<ExamStartResponse> ValidateAsync()
        {
            ExamStartResponse response = new ExamStartResponse();
            if (string.IsNullOrEmpty(this.ExamId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId is not null or empty!"
                });
            }
            if (string.IsNullOrEmpty(this.UserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId is not null or empty!"
                });
            }
            if(this.ExamId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId must be larger than 0!"
                });
            }
            if (this.UserId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be larger than 0!"
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
