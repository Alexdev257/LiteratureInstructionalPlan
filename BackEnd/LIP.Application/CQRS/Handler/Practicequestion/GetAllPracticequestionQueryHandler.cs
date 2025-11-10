using System.Text.Json;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class
    GetAllPracticequestionQueryHandler : IRequestHandler<GetAllPracticequestionQuery, GetAllPracticeQuestionResponse>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public GetAllPracticequestionQueryHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<GetAllPracticeQuestionResponse> Handle(GetAllPracticequestionQuery request,
        CancellationToken cancellationToken)
    {
        var rs = await _practicequestionRepository.GetAllAsync(new PracticequestionGetAllQuery
        {
            QuestionType = request.QuestionType, GradeLevelId = request.GradeLevelId,
            CreatedBy = request.CreatedByUserId, IsAdmin = request.IsAdmin
        });
        //if (rs == null)
        //    return new GetAllPracticeQuestionResponse
        //    {
        //        IsSuccess = false,
        //        Message = "No Questions in system!"
        //    };
        var dataList = rs.Select(r => new GetAllPracticeQuestionResponseDTO
        {
            QuestionId = r.QuestionId,
            Content = r.Content,
            QuestionType = r.QuestionType,
            Difficulty = r.Difficulty,
            //Answer = r.Answer,
            Answer = !request.IsShowAnswer.Value
                ? new List<AnswerOption>()
                : string.IsNullOrWhiteSpace(r.Answer)
                    ? new List<AnswerOption>()
                    : JsonSerializer.Deserialize<List<AnswerOption>>(r.Answer!),
            CorrectAnswer = !request.IsShowCorrectAnswer.Value
                ? new List<AnswerOption>()
                : string.IsNullOrWhiteSpace(r.CorrectAnswer)
                    ? new List<AnswerOption>()
                    : JsonSerializer.Deserialize<List<AnswerOption>>(r.CorrectAnswer!),
            GradeLevel = r.GradeLevel != null ? new GradeLevelDTO
            {
                Id = r.GradeLevel.GradeLevelId,
                Name = r.GradeLevel.Name
            } : null!,
            CreatedBy = r.CreatedByNavigation != null ? new CreatedByDTO
            {
                Id = r.CreatedByNavigation.UserId,
                UserName = r.CreatedByNavigation.UserName,
                Email = r.CreatedByNavigation.Email
            } : null!,
            CreatedAt = r.CreatedAt
        }).ToList();

        dataList = dataList.OrderByDescending(d => d.CreatedAt.Value).ToList();

        var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
        return new GetAllPracticeQuestionResponse
        {
            IsSuccess = true,
            Data = paged,
            Message = paged.Items.Any()
                ? "Get All Question successfully!"
                : "No Questions in system!"
        };
    }
}