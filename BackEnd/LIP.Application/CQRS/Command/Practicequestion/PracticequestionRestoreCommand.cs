using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Practicequestion
{
    public class PracticequestionRestoreCommand : IRequest<PracticeQuestionRestoreResponse>, IValidatable<PracticeQuestionRestoreResponse>
    {
        public int QuestionId { get; set; }

        public Task<PracticeQuestionRestoreResponse> ValidateAsync()
        {
            PracticeQuestionRestoreResponse response = new PracticeQuestionRestoreResponse();
            if (string.IsNullOrEmpty(this.QuestionId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionId",
                    Detail = "QuestionId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.QuestionId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionId",
                    Detail = "QuestionId must be an integer!"
                });
            }
            if (this.QuestionId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionId",
                    Detail = "QuestionId must be larger than 0!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
