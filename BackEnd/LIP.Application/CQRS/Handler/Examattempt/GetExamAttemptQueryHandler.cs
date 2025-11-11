using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Repository;
using MediatR;
using System.Text.Json;

namespace LIP.Application.CQRS.Handler.Examattempt;

public class GetExamAttemptQueryHandler : IRequestHandler<GetExamAttemptQuery, GetExamAttemptResponse>
{
    private readonly IExamattemptRepository _examattemptRepository;

    public GetExamAttemptQueryHandler(IExamattemptRepository examattemptRepository)
    {
        _examattemptRepository = examattemptRepository;
    }

    public async Task<GetExamAttemptResponse> Handle(GetExamAttemptQuery request, CancellationToken cancellationToken)
    {
        var attempt = await _examattemptRepository.GetAsync(new ExamattemptGetQuery
            { AttemptId = request.AttemptId, IsAdmin = request.IsAdmin });
        if (attempt == null)
            return new GetExamAttemptResponse
            {
                IsSuccess = false,
                Message = "Attempt is not found!"
            };

        var data = new GetExamAttemptResponseDTO
        {
            AttemptId = attempt.AttemptId,
            ExamId = attempt.ExamId,
            User = new DTOs.Response.Template.CreatedByDTO
            {
                Id = attempt.User.UserId,
                Email = attempt.User.Email,
                UserName = attempt.User.UserName,
            },
            StartTime = attempt.StartTime,
            EndTime = attempt.EndTime,
            Status = attempt.Status,
            Score = attempt.Score,
            Feedback = attempt.Feedback,
            LastSavedAt = attempt.LastSavedAt,
            ExamAnswer = attempt.Examanswers.Select(ass => new ExamAnswerDTO
            {
                QuestionId = ass.QuestionId,
                AnswerContent = string.IsNullOrEmpty(ass.AnswerContent)
                        ? new List<DTOs.Request.PracticeQuestion.AnswerOption>()
                        : JsonSerializer.Deserialize<List<AnswerOption>>(ass.AnswerContent),
            }).ToList(),
        };
        return new GetExamAttemptResponse
        {
            IsSuccess = true,
            Data = data,
            Message = "Get Attempt successfully!"
        };
    }
}