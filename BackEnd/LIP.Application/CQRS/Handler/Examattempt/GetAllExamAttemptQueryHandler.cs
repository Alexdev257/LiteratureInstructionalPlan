using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Repository;
using MediatR;
using System.Text.Json;

namespace LIP.Application.CQRS.Handler.Examattempt;

public class GetAllExamAttemptQueryHandler : IRequestHandler<GetAllExamAttemptQuery, GetAllExamAttemptResponse>
{
    private readonly IExamattemptRepository _examattemptRepository;

    public GetAllExamAttemptQueryHandler(IExamattemptRepository examattemptRepository)
    {
        _examattemptRepository = examattemptRepository;
    }

    public async Task<GetAllExamAttemptResponse> Handle(GetAllExamAttemptQuery request,
        CancellationToken cancellationToken)
    {
        var attempts = await _examattemptRepository.GetAllAsync(new ExamattemptGetAllQuery
            { ExamId = request.ExamId, UserId = request.UserId, Status = request.Status, IsAdmin = request.IsAdmin });
        //if (attempts == null || !attempts.Any())
        //    return new GetAllExamAttemptResponse
        //    {
        //        IsSuccess = true,
        //        Message = "No Attempt in the system!"
        //    };

        var dataList = attempts.Select(a => new GetAllExamAttemptResponseDTO
        {
            AttemptId = a.AttemptId,
            ExamId = a.ExamId,
            //UserId = a.UserId,
            User = new DTOs.Response.Template.CreatedByDTO
            {
                Id = a.User.UserId,
                UserName = a.User.UserName,
                Email = a.User.Email,
            },
            StartTime = a.StartTime,
            EndTime = a.EndTime,
            Status = a.Status,
            Score = a.Score,
            Feedback = a.Feedback,
            LastSavedAt = a.LastSavedAt,
            ExamAnswer = a.Examanswers.Select(ass => new ExamAnswerDTO
            {
                QuestionId = ass.QuestionId,
                AnswerContent = string.IsNullOrEmpty(ass.AnswerContent)
                    ? new List<DTOs.Request.PracticeQuestion.AnswerOption>()
                    : JsonSerializer.Deserialize<List<AnswerOption>>(ass.AnswerContent)
            }).ToList(),
        }).ToList();

        dataList = dataList.OrderByDescending(a => a.LastSavedAt).ToList();

        var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
        return new GetAllExamAttemptResponse
        {
            IsSuccess = true,
            Data = paged,
            Message = paged.Items.Any()
                ? "Get All Attempts successfully!"
                : "No Attempts in system!"
        };
    }
}