using System.Text.Json;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class GetAllExamQueryHandler : IRequestHandler<GetAllExamQuery, GetAllExamResponse>
{
    private readonly IExamRepository _examRepository;

    public GetAllExamQueryHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<GetAllExamResponse> Handle(GetAllExamQuery request, CancellationToken cancellationToken)
    {
        var exams = await _examRepository.GetAllAsync(new ExamGetAllQuery
        {
            GradeLevelId = request.GradeLevelId, ExamTypeId = request.ExamTypeId, CreatedBy = request.CreatedBy,
            IsAdmin = request.IsAdmin
        });
        //if (exams == null || !exams.Any())
        //    return new GetAllExamResponse
        //    {
        //        IsSuccess = false,
        //        Message = "No exam in the system!"
        //    };

        var examDTO = exams.Select(e => new GetAllExamResponseDTO
        {
            ExamId = e.ExamId,
            Title = e.Title,
            Description = e.Description,
            DurationMinutes = e.DurationMinutes!.Value,
            //GradeLevelId = e.GradeLevelId!.Value,
            //ExamTypeId = e.ExamTypeId!.Value,
            GradeLevel = e.GradeLevel != null ? new GradeLevelDTO
            {
                GradeLevelId = e.GradeLevel.GradeLevelId,
                Name = e.GradeLevel.Name
            } : null!,
            ExamType = e.ExamType != null ? new ExamTypeDTO
            {
                ExamTypeId = e.ExamType.ExamTypeId,
                Name = e.ExamType.Name,
            } : null!,
            MatrixId = e.MatrixId!.Value,
            //CreateByUserId = e.CreatedByNavigationUserId!.Value,
            CreatedBy = e.CreatedByNavigation != null ? new CreatedByDTO
            {
                UserId = e.CreatedByNavigation.UserId,
                FullName = e.CreatedByNavigation.FullName,
                Email = e.CreatedByNavigation.Email,
            } : null!,
            CreatedAt = e.CreatedAt!.Value,
            Questions = e.Questions.Select(q => new QuestionDTO
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
                        : JsonSerializer.Deserialize<List<AnswerOption>>(q.CorrectAnswer),
            }).ToList()
        }).ToList();

        examDTO = examDTO.OrderByDescending(e => e.CreatedAt).ToList();

        //return new GetAllExamResponse
        //{
        //    IsSuccess = true,
        //    Data = examDTO,
        //    Message = "Get All Exam successfully!",
        //};

        var paged = examDTO.ToPagedListAsync(request.PageNumber, request.PageSize);
        return new GetAllExamResponse
        {
            IsSuccess = true,
            Data = paged,
            Message = paged.Items.Any()
                ? "Get All Exams successfully!"
                : "No Exams in system!"
        };
    }
}