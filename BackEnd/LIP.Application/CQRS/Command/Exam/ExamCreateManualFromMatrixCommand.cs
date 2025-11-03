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
    public class ExamCreateManualFromMatrixCommand : IRequest<ExamCreateManualFromMatrixResponse>, IValidatable<ExamCreateManualFromMatrixResponse>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int DurationMinutes { get; set; }
        public int GradeLevelId { get; set; }
        public int ExamTypeId { get; set; }
        public int CreatedByNavigationUserId { get; set; }
        //public DateTime CreatedAt { get; set; } //= DateTime.UtcNow;
        public int MatrixId { get; set; } 
        public List<int> QuestionIds { get; set; } = new();

        public Task<ExamCreateManualFromMatrixResponse> ValidateAsync()
        {
            ExamCreateManualFromMatrixResponse response = new ExamCreateManualFromMatrixResponse();
            //if (string.IsNullOrEmpty(this.Title))
            //{
            //    response.ListErrors.Add(new Errors
            //    {
            //        Field = "Title",
            //        Detail = "Title is not null or empty!"
            //    });
            //}
            //if (string.IsNullOrEmpty(this.Description))
            //{
            //    response.ListErrors.Add(new Errors
            //    {
            //        Field = "Description",
            //        Detail = "Description is not null or empty!"
            //    });
            //}
            if (string.IsNullOrEmpty(this.DurationMinutes.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "DurationMinutes",
                    Detail = "DurationMinutes is not null or empty!"
                });
            }
            if(!Int32.TryParse(this.DurationMinutes.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "DurationMinutes",
                    Detail = "DurationMinutes must be an Integer!"
                });
            }
            if(this.DurationMinutes <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "DurationMinutes",
                    Detail = "DurationMinutes must be larger than 0!"
                });
            }
            if (string.IsNullOrEmpty(this.GradeLevelId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.GradeLevelId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be an Integer!"
                });
            }
            if (this.GradeLevelId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be larger than 0!"
                });
            }
            if (string.IsNullOrEmpty(this.ExamTypeId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.ExamTypeId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId must be an Integer!"
                });
            }
            if (this.ExamTypeId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId must be larger than 0!"
                });
            }
            if (string.IsNullOrEmpty(this.CreatedByNavigationUserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByNavigationUserId",
                    Detail = "ExamTypeId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.CreatedByNavigationUserId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByNavigationUserId",
                    Detail = "ExamTypeId must be an Integer!"
                });
            }
            if (this.CreatedByNavigationUserId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByNavigationUserId",
                    Detail = "ExamTypeId must be larger than 0!"
                });
            }
            if (string.IsNullOrEmpty(this.MatrixId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByNavigationUserId",
                    Detail = "ExamTypeId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.MatrixId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByNavigationUserId",
                    Detail = "ExamTypeId must be an Integer!"
                });
            }
            if (this.MatrixId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByNavigationUserId",
                    Detail = "ExamTypeId must be larger than 0!"
                });
            }
            if (!this.QuestionIds.Any())
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionIds",
                    Detail = "QuestionIds must be added before creating exam!"
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
