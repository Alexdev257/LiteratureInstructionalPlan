using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Exam;

public class GetAllExamQuery : PaginationRequest, IRequest<GetAllExamResponse>, IValidatable<GetAllExamResponse>
{
    public int? GradeLevelId { get; set; }
    public int? ExamTypeId { get; set; }
    public int? CreatedBy { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;

    public Task<GetAllExamResponse> ValidateAsync()
    {
        var response = new GetAllExamResponse();
        if (!string.IsNullOrEmpty(GradeLevelId.ToString()))
            if (GradeLevelId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be larger than 0"
                });

        if (!string.IsNullOrEmpty(ExamTypeId.ToString()))
            if (ExamTypeId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId must be larger than 0"
                });

        if (!string.IsNullOrEmpty(CreatedBy.ToString()))
            if (CreatedBy <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedBy",
                    Detail = "CreatedBy must be larger than 0"
                });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}