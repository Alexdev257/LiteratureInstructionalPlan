using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Practicequestion;

public class PracticequestionRestoreCommand : IRequest<PracticeQuestionRestoreResponse>,
    IValidatable<PracticeQuestionRestoreResponse>
{
    public int QuestionId { get; set; }

    public Task<PracticeQuestionRestoreResponse> ValidateAsync()
    {
        var response = new PracticeQuestionRestoreResponse();
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
                Detail = "QuestionId must be an integer!"
            });
        if (QuestionId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "QuestionId",
                Detail = "QuestionId must be larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}