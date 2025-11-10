using System.Text.Json;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class GetExamQueryHandler : IRequestHandler<GetExamQuery, GetExamResponse>
{
    private readonly IExamRepository _examRepository;

    public GetExamQueryHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<GetExamResponse> Handle(GetExamQuery request, CancellationToken cancellationToken)
    {
        var exam = await _examRepository.GetAsync(new ExamGetQuery
            { ExamId = request.ExamId, IsAdmin = request.IsAdmin });
        if (exam == null)
            return new GetExamResponse
            {
                IsSuccess = false,
                Message = "Exam is not found!"
            };

        var examDTO = new GetExamResponseDTO
        {
            ExamId = exam.ExamId,
            Title = exam.Title,
            Description = exam.Description,
            DurationMinutes = exam.DurationMinutes!.Value,
            //GradeLevelId = exam.GradeLevelId!.Value,
            //ExamTypeId = exam.ExamTypeId!.Value,
            GradeLevel = exam.GradeLevel != null ? new GradeLevelDTO
            {
                Id = exam.GradeLevel.GradeLevelId,
                Name = exam.GradeLevel.Name
            } : null!,
            ExamType = exam.ExamType != null ? new ExamTypeDTO
            {
                Id = exam.ExamType.ExamTypeId,
                Name = exam.ExamType.Name,
            } : null!,
            MatrixId = exam.MatrixId!.Value,
            //CreateByUserId = exam.CreatedByNavigationUserId!.Value,
            CreatedBy = exam.CreatedByNavigation != null ? new CreatedByDTO
            {
                Id = exam.CreatedByNavigation.UserId,
                UserName = exam.CreatedByNavigation.UserName,
                Email = exam.CreatedByNavigation.Email,
            } : null!,
            CreatedAt = exam.CreatedAt!.Value,
            Questions = exam.Questions.Select(q => new QuestionDTO
            {
                QuestionId = q.QuestionId,
                Content = q.Content,
                QuestionType = q.QuestionType,
                Difficulty = q.Difficulty,
                GradeLevelId = q.GradeLevelId!.Value,
                CreatedByNavigationUserId = q.CreatedByNavigationUserId!.Value,
                CreatedAt = q.CreatedAt!.Value,
                Answer = string.IsNullOrWhiteSpace(q.Answer)
                    ? new List<AnswerOption>()
                    : JsonSerializer.Deserialize<List<AnswerOption>>(q.Answer!),
                CorrectAnswer = !request.IsShowCorrectAnswer!.Value
                    ? new List<AnswerOption>()
                    : string.IsNullOrWhiteSpace(q.CorrectAnswer)
                        ? new List<AnswerOption>()
                        : JsonSerializer.Deserialize<List<AnswerOption>>(q.CorrectAnswer)
            }).ToList()
        };

        return new GetExamResponse
        {
            IsSuccess = true,
            Data = examDTO,
            Message = "Get Exam successfully!"
        };
    }
}