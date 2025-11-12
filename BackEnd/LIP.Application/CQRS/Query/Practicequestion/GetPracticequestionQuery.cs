using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Practicequestion;

public class GetPracticequestionQuery : IRequest<GetPracticequestionResponse>, IValidatable<GetPracticequestionResponse>
{
    public int QuestionId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowAnswer { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;

    public Task<GetPracticequestionResponse> ValidateAsync()
    {
        var response = new GetPracticequestionResponse();
        if (string.IsNullOrEmpty(QuestionId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "QuestionId",
                Detail = "QuestionId is not null or empty!"
            });
        if (!int.TryParse(QuestionId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "QuestionId",
                Detail = "QuestionId must be an Integer!"
            });
        if (QuestionId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId must be larger than 0!"
            });
        if (IsAdmin != null)
            if (!bool.TryParse(IsAdmin.ToString(), out _))
                response.ListErrors.Add(new Errors
                {
                    Field = "IsAdmin",
                    Detail = "IsAdmin must be a boolean value!"
                });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}