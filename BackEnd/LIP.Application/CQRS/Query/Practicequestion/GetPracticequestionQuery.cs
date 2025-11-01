using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Validation;
using LIP.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.Practicequestion
{
    public class GetPracticequestionQuery : IRequest<GetPracticequestionResponse>, IValidatable<GetPracticequestionResponse>
    {
        public int QuestionId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
        public bool? IsShowAnswer { get; set; } = false!;

        public Task<GetPracticequestionResponse> ValidateAsync()
        {
            GetPracticequestionResponse response = new GetPracticequestionResponse();
            if (string.IsNullOrEmpty(QuestionId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionId",
                    Detail = "QuestionId is not null or empty!"
                });
            }
            if (!Int32.TryParse(QuestionId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionId",
                    Detail = "QuestionId must be an Integer!"
                });
            }
            if (this.QuestionId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be larger than 0!"
                });
            }
            if (IsAdmin != null)
            {
                if (!Boolean.TryParse(IsAdmin.ToString(), out var _))
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "IsAdmin",
                        Detail = "IsAdmin must be a boolean value!"
                    });
                }
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
