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
using LIP.Application.DTOs.Request.Exam;

namespace LIP.Application.CQRS.Command.Exam
{
    public class ExamSubmitCommand : IRequest<ExamSubmitResponse>, IValidatable<ExamSubmitResponse>
    {
        public int AttemptId { get; set; }
        public List<SubmitAnswerCommandDTO> Answers { get; set; } = new();

        public Task<ExamSubmitResponse> ValidateAsync()
        {
            ExamSubmitResponse response = new ExamSubmitResponse();
            if(string.IsNullOrEmpty(this.AttemptId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "AttemptId",
                    Detail = "AttemptId is not null or empty!"
                });
            }
            if(this.AttemptId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "AttemptId",
                    Detail = "AttemptId must be larger than 0!"
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }

    public class SubmitAnswerCommandDTO
    {
        public int QuestionId { get; set; }
        public string? AnswerContent { get; set; } 
    }



}
