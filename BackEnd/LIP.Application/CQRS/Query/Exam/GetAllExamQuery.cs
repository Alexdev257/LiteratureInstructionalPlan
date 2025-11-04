using LIP.Application.DTOs.Response.Exam;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIP.Application.DTOs.Request;

namespace LIP.Application.CQRS.Query.Exam
{
    public class GetAllExamQuery : PaginationRequest, IRequest<GetAllExamResponse>, IValidatable<GetAllExamResponse>
    {
        public int? GradeLevelId { get; set; }
        public int? ExamTypeId { get; set; }
        public int? CreatedBy { get; set; }
        public bool? IsAdmin { get; set; } = false!;
        public bool? IsShowCorrectAnswer { get; set; } = false!;

        public Task<GetAllExamResponse> ValidateAsync()
        {
            GetAllExamResponse response = new GetAllExamResponse();
            if (!string.IsNullOrEmpty(this.GradeLevelId.ToString()))
            {
                if(this.GradeLevelId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "GradeLevelId",
                        Detail = "GradeLevelId must be larger than 0"
                    });
                }
            }
            if (!string.IsNullOrEmpty(this.ExamTypeId.ToString()))
            {
                if (this.ExamTypeId <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "ExamTypeId",
                        Detail = "ExamTypeId must be larger than 0"
                    });
                }
            }
            if (!string.IsNullOrEmpty(this.CreatedBy.ToString()))
            {
                if (this.CreatedBy <= 0)
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "CreatedBy",
                        Detail = "CreatedBy must be larger than 0"
                    });
                }
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
