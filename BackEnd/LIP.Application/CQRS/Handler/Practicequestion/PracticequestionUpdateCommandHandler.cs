using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;
using System.Text.Json;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class
    PracticequestionUpdateCommandHandler : IRequestHandler<PracticequestionUpdateCommand,
    PracticeQuestionUpdateResponse>
{
    private readonly IGradelevelRepository _gradelevelRepository;
    private readonly IPracticequestionRepository _practicequestionRepository;
    private readonly IUserRepository _userRepository;

    public PracticequestionUpdateCommandHandler(IPracticequestionRepository practicequestionRepository,
        IUserRepository userRepository, IGradelevelRepository gradelevelRepository)
    {
        _practicequestionRepository = practicequestionRepository;
        _userRepository = userRepository;
        _gradelevelRepository = gradelevelRepository;
    }

    public async Task<PracticeQuestionUpdateResponse> Handle(PracticequestionUpdateCommand request,
        CancellationToken cancellationToken)
    {
        var question = await _practicequestionRepository.GetAsync(new PracticequestionGetQuery
            { QuestionId = request.QuestionId });
        if (question == null)
            return new PracticeQuestionUpdateResponse
            {
                IsSuccess = false,
                Message = "Practice Question is not found!"
            };
        request.CreatedAt = question.CreatedAt; // keep the old created at
        //request.IsDeleted = question.IsDeleted; // keep the old is deleted status
        //request.DeletedAt = question.DeletedAt; // keep the old deleted at
        var user = await _userRepository.GetAsync(new UserGetQuery { UserId = request.CreatedByUserId.Value });
        if (user == null)
            return new PracticeQuestionUpdateResponse
            {
                IsSuccess = false,
                Message = "User is not found!"
            };
        var gradelevel = await _gradelevelRepository.GetAsync(new GradelevelGetQuery
            { GradeLevelId = request.GradeLevelId.Value });
        if (gradelevel == null)
            return new PracticeQuestionUpdateResponse
            {
                IsSuccess = false,
                Message = "Grade Level is not found!"
            };
        request.CreatedAt = question.CreatedAt; // keep the old created at
        var rs = await _practicequestionRepository.UpdateAsync(request);
        if (rs)
        {
            var curQuestion = await _practicequestionRepository.GetAsync(new Query.Practicequestion.PracticequestionGetQuery { QuestionId = request.QuestionId});
            var dto = new PracticeQuestionUpdateResponseDTO
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
            return new PracticeQuestionUpdateResponse
            {
                IsSuccess = true,
                Data = dto,
                Message = "Update Practice Question successfully!"
            };
        }
        else
        {
            return new PracticeQuestionUpdateResponse
            {
                IsSuccess = false,
                Message = "Update Practice Question failed"
            };
        }   
    }
}