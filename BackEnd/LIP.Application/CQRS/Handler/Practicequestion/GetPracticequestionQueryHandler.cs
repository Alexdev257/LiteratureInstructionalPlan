using System.Text.Json;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class GetPracticequestionQueryHandler : IRequestHandler<GetPracticequestionQuery, GetPracticequestionResponse>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public GetPracticequestionQueryHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<GetPracticequestionResponse> Handle(GetPracticequestionQuery request,
        CancellationToken cancellationToken)
    {
        var rs = await _practicequestionRepository.GetAsync(new PracticequestionGetQuery
            { QuestionId = request.QuestionId, IsAdmin = request.IsAdmin });
        if (rs == null)
            return new GetPracticequestionResponse
            {
                IsSuccess = false,
                Message = "Question is not exist!"
            };

        var responseDTO = new GetPracticequestionResponseDTO
        {
            QuestionId = rs.QuestionId,
            Content = rs.Content,
            QuestionType = rs.QuestionType,
            Difficulty = rs.Difficulty,
            //Answer = rs.Answer,
            Answer = !request.IsShowAnswer.Value
                ? new List<AnswerOption>()
                : string.IsNullOrEmpty(rs.Answer)
                    ? new List<AnswerOption>()
                    : JsonSerializer.Deserialize<List<AnswerOption>>(rs.Answer),
            CorrectAnswer = !request.IsShowCorrectAnswer.Value
                ? new List<AnswerOption>()
                : string.IsNullOrEmpty(rs.CorrectAnswer)
                    ? new List<AnswerOption>()
                    : JsonSerializer.Deserialize<List<AnswerOption>>(rs.CorrectAnswer),
            GradeLevel = rs.GradeLevel != null ? new GradeLevelDTO
            {
                Id = rs.GradeLevel.GradeLevelId,
                Name = rs.GradeLevel.Name
            } : null!,
            CreatedBy = rs.CreatedByNavigation != null ? new CreatedByDTO
            {
                Id = rs.CreatedByNavigation.UserId,
                UserName = rs.CreatedByNavigation.UserName,
                Email = rs.CreatedByNavigation.Email
            } : null!,
            CreatedAt = rs.CreatedAt
        };
        return new GetPracticequestionResponse
        {
            IsSuccess = true,
            Data = responseDTO,
            Message = "Get Question successfully!"
        };
    }
}