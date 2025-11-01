using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.Practicequestion
{
    public class GetAllPracticequestionQuery : PaginationRequest, IRequest<GetAllPracticeQuestionResponse>, IValidatable<GetAllPracticeQuestionResponse>
    {
        public string? QuestionType { get; set; }
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
        public bool? IsShowAnswer { get; set; } = false!;

        public Task<GetAllPracticeQuestionResponse> ValidateAsync()
        {
            GetAllPracticeQuestionResponse response = new GetAllPracticeQuestionResponse();
            if(GradeLevelId != null)
            {
                if(!Int32.TryParse(this.GradeLevelId.ToString(), out var _))
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "GradeLevelId",
                        Detail = "GradeLevelId must be an Integer!"
                    });
                }
                if(this.GradeLevelId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "GradeLevelId",
                        Detail = "GradeLevelId must be larger than 0!"
                    });
                }
            }
            if (CreatedByUserId != null)
            {
                if (!Int32.TryParse(this.CreatedByUserId.ToString(), out var _))
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "CreatedByUserId",
                        Detail = "CreatedByUserId must be an Integer!"
                    });
                }
                if (this.CreatedByUserId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "CreatedByUserId",
                        Detail = "CreatedByUserId must be larger than 0!"
                    });
                }
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
            if (PageNumber <= 0)
            {
                response.ListErrors.Add(new Errors { 
                    Field = "PageNumber", 
                    Detail = "PageNumber must be larger or equal 1"
                });
            }
            if (PageSize <= 0)
            {
                response.ListErrors.Add(new Errors { 
                    Field = "PageSize", 
                    Detail = "PageSize must be larger or equal 1"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
