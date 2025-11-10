using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;
using System.Text.Json;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class
    PracticequestionCreateCommandHandler : IRequestHandler<PracticequestionCreateCommand,
    PracticeQuestionCreateResponse>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public PracticequestionCreateCommandHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<PracticeQuestionCreateResponse> Handle(PracticequestionCreateCommand request,
        CancellationToken cancellationToken)
    {
        request.CreatedAt = DateTime.UtcNow;
        //string? answerJson = null;
        //if(request.Answer != null && request.Answer.Any())
        //{
        //    answerJson = JsonSerializer.Serialize(request.Answer);
        //}
        //request.Answer = answerJson;
        var rs = await _practicequestionRepository.CreateAsync(request);
        if (rs)
        {
            var curQuestionList = await _practicequestionRepository.GetAllAsync(new Query.Practicequestion.PracticequestionGetAllQuery { });
            var curQuestion = curQuestionList.OrderByDescending(q => q.QuestionId).FirstOrDefault();
            var dto = new PracticeQuestionCreateResponseDTO
            {
                QuestionId = curQuestion.QuestionId,
                Content = curQuestion.Content,
                QuestionType = curQuestion.QuestionType,
                Difficulty = curQuestion.Difficulty,
                Answer = string.IsNullOrEmpty(curQuestion.Answer)
                            ? new List<AnswerOption>()
                            : JsonSerializer.Deserialize<List<AnswerOption>>(curQuestion.Answer),
                CorrectAnswer = string.IsNullOrEmpty(curQuestion.CorrectAnswer)
                                    ? new List<AnswerOption>()
                                    : JsonSerializer.Deserialize<List<AnswerOption>>(curQuestion.CorrectAnswer),
                GradeLevelId = curQuestion.GradeLevelId,
                CreatedByNavigationUserId = curQuestion.CreatedByNavigationUserId,
                CreatedAt = curQuestion.CreatedAt,
            };
            return new PracticeQuestionCreateResponse
            {
                IsSuccess = true,
                Data = dto,
                Message = "Create Practice Question successfully!"
            };
        }
        else
        {
            return new PracticeQuestionCreateResponse
            {
                IsSuccess = false,
                Message = "Create Practice Question failed"
            };
        }
    }
}