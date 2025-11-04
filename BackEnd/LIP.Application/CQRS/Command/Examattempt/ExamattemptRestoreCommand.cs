using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Examattempt
{
    public class ExamattemptRestoreCommand : IRequest<ExamAttemptRestoreResponse>, IValidatable<ExamAttemptRestoreResponse>
    {
        public int AttemptId { get; set; }

        public Task<ExamAttemptRestoreResponse> ValidateAsync()
        {
            ExamAttemptRestoreResponse response = new ExamAttemptRestoreResponse();
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
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
