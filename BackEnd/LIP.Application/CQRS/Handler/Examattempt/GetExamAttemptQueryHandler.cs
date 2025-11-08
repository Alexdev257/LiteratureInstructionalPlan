using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Repository;
using MediatR;

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
            UserId = attempt.UserId,
            StartTime = attempt.StartTime,
            EndTime = attempt.EndTime,
            Status = attempt.Status,
            Score = attempt.Score,
            Feedback = attempt.Feedback,
            LastSavedAt = attempt.LastSavedAt
        };
        return new GetExamAttemptResponse
        {
            IsSuccess = true,
            Data = data,
            Message = "Get Attempt successfully!"
        };
    }
}