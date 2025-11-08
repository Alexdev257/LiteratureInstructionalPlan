using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Exam;

public class ExamSubmitCommand : IRequest<ExamSubmitResponse>, IValidatable<ExamSubmitResponse>
{
    public int AttemptId { get; set; }
    public List<SubmitAnswerCommandDTO> Answers { get; set; } = new();

    public Task<ExamSubmitResponse> ValidateAsync()
    {
        var response = new ExamSubmitResponse();
        if (string.IsNullOrEmpty(AttemptId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "AttemptId",
                Detail = "AttemptId is not null or empty!"
            });
        if (AttemptId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "AttemptId",
                Detail = "AttemptId must be larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}

public class SubmitAnswerCommandDTO
{
    public int QuestionId { get; set; }
    public string? AnswerContent { get; set; }
}