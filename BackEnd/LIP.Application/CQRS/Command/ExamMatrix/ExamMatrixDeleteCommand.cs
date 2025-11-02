using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.ExamMatrix
{
    public class ExamMatrixDeleteCommand : IRequest<ExamMatrixDeleteResponse>, IValidatable<ExamMatrixDeleteResponse>
    {
        public int MatrixId { get; set; }

        public Task<ExamMatrixDeleteResponse> ValidateAsync()
        {
            ExamMatrixDeleteResponse response = new ExamMatrixDeleteResponse();
            if (string.IsNullOrEmpty(this.MatrixId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId is not null or empty!",
                });
            }
            if (!Int32.TryParse(this.MatrixId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId must be an Integer!",
                });
            }
            if(this.MatrixId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId must be larger than 0!",
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
        //public string? Title { get; set; }
        //public string? Description { get; set; }
        //public int? GradeLevelId { get; set; }
        //public int? CreatedByUserId { get; set; }
        //public DateTime? CreatedAt { get; set; }
        //public string? Status { get; set; }
        //public string? Notes { get; set; }
    }
}
