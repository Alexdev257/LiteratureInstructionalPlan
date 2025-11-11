using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Practicequestion;

public class GetAllPracticequestionQuery : PaginationRequest, IRequest<GetAllPracticeQuestionResponse>,
    IValidatable<GetAllPracticeQuestionResponse>
{
    public string? QuestionType { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public string? Search { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowAnswer { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;

    public Task<GetAllPracticeQuestionResponse> ValidateAsync()
    {
        var response = new GetAllPracticeQuestionResponse();
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
                    Detail = "GradeLevelId must be larger than 0!"
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
                    Detail = "CreatedByUserId must be larger than 0!"
                });
        }

        if (IsAdmin != null)
            if (!bool.TryParse(IsAdmin.ToString(), out _))
                response.ListErrors.Add(new Errors
                {
                    Field = "IsAdmin",
                    Detail = "IsAdmin must be a boolean value!"
                });

        if (PageNumber <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "PageNumber",
                Detail = "PageNumber must be larger or equal 1"
            });
        if (PageSize <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "PageSize",
                Detail = "PageSize must be larger or equal 1"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}