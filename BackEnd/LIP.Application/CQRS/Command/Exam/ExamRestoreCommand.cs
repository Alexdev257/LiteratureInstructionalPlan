using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Exam
{
    public class ExamRestoreCommand : IRequest<ExamRestoreResponse>, IValidatable<ExamRestoreResponse>
    {
        public int ExamId { get; set; }

        public Task<ExamRestoreResponse> ValidateAsync()
        {
            ExamRestoreResponse response = new ExamRestoreResponse();
            if (string.IsNullOrEmpty(this.ExamId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId is not null or empty!"
                });
            }
            if (this.ExamId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId must be larger than 0!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}

