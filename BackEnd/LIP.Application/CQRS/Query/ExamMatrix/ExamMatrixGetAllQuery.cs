using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.ExamMatrix;

public class ExamMatrixGetAllQuery : PaginationRequest, IRequest<ExamMatrixGetAllResponse>,
    IValidatable<ExamMatrixGetAllResponse>
{
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public bool? IsAdmin { get; set; } = false;

    public Task<ExamMatrixGetAllResponse> ValidateAsync()
    {
        var response = new ExamMatrixGetAllResponse();
        if (GradeLevelId != null)
        {
            if (!int.TryParse(GradeLevelId.ToString(), out _))
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be an Integer!"
                });
            if (GradeLevelId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must larger than 0!"
                });
        }

        if (CreatedByUserId != null)
        {
            if (!int.TryParse(CreatedByUserId.ToString(), out _))
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByUserId",
                    Detail = "CreatedByUserId must be an Integer!"
                });
            if (CreatedByUserId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedByUserId",
                    Detail = "CreatedByUserId must larger than 0!"
                });
        }

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}