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
    public class ExamMatrixRestoreCommand : IRequest<ExamMatrixRestoreResponse>, IValidatable<ExamMatrixRestoreResponse>
    {
        public int MatrixId { get; set; }

        public Task<ExamMatrixRestoreResponse> ValidateAsync()
        {
            ExamMatrixRestoreResponse response = new ExamMatrixRestoreResponse();
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
            if (this.MatrixId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "MatrixId",
                    Detail = "MatrixId must be larger than 0!",
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
