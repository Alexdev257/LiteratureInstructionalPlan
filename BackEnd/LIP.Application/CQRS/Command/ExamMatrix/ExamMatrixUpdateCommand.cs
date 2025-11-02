using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.ExamMatrix
{
    public class ExamMatrixUpdateCommand : IRequest<ExamMatrixUpdateResponse>, IValidatable<ExamMatrixUpdateResponse>
    {
        public int MatrixId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public List<ExamMatrixDetailUpdateCommand> Details{ get; set; }

        public Task<ExamMatrixUpdateResponse> ValidateAsync()
        {
            ExamMatrixUpdateResponse response = new ExamMatrixUpdateResponse();
            if (string.IsNullOrEmpty(this.MatrixId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId is not null or empty!"
                });
            }
            if(!Int32.TryParse(this.MatrixId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId must be an Integer!"
                });
            }
            if(this.MatrixId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId must larger than 0!"
                });
            }
            if (string.IsNullOrEmpty(this.Title))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Title",
                    Detail = "Title is not null or empty!"
                });
            }
            if (string.IsNullOrEmpty(this.Description))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Description",
                    Detail = "Description is not null or empty!"
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
            if (string.IsNullOrEmpty(this.CreatedByUserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByUserId",
                    Detail = "CreatedByUserId is not null or empty!"
                });
            }
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
            if (string.IsNullOrEmpty(this.Status))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Status",
                    Detail = "Status is not null or empty!"
                });
            }
            if (string.IsNullOrEmpty(this.Notes))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Notes",
                    Detail = "Notes is not null or empty!"
                });
            }

            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
