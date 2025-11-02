using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.ExamMatrix
{
    public class ExamMatrixGetAllQuery : IRequest<ExamMatrixGetAllResponse>, IValidatable<ExamMatrixGetAllResponse>
    {
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public bool? IsAdmin { get; set; } = false;

        public Task<ExamMatrixGetAllResponse> ValidateAsync()
        {
            ExamMatrixGetAllResponse response = new ExamMatrixGetAllResponse();
            if(this.GradeLevelId != null)
            {
                if(!Int32.TryParse(this.GradeLevelId.ToString(),out var _))
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
                        Detail = "GradeLevelId must larger than 0!"
                    });
                }
            }

            if (this.CreatedByUserId != null)
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
                        Detail = "CreatedByUserId must larger than 0!"
                    });
                }
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
