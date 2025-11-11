using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class
    ExamUpdateFromMatrixCommandHandler : IRequestHandler<ExamUpdateFromMatrixCommand, ExamUpdateFromMatrixResponse>
{
    private readonly IExamMatrixRepository _examMatrixRepository;
    private readonly IExamRepository _examRepository;
    private readonly IPracticequestionRepository _practicequestionRepository;

    public ExamUpdateFromMatrixCommandHandler(IExamRepository examRepository,
        IExamMatrixRepository examMatrixRepository, IPracticequestionRepository practicequestionRepository)
    {
        _examRepository = examRepository;
        _examMatrixRepository = examMatrixRepository;
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<ExamUpdateFromMatrixResponse> Handle(ExamUpdateFromMatrixCommand request,
        CancellationToken cancellationToken)
    {
        var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = request.ExamId });
        if (exam == null)
            return new ExamUpdateFromMatrixResponse
            {
                IsSuccess = false,
                Message = "Exam is not found!"
            };

        if (exam.IsDeleted)
            return new ExamUpdateFromMatrixResponse
            {
                IsSuccess = false,
                Message = "Exam is deleted!"
            };

        var matrix = await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery { MatrixId = exam.MatrixId!.Value });
        if (matrix == null)
            return new ExamUpdateFromMatrixResponse
            {
                IsSuccess = false,
                Message = "Matrix is not found!"
            };
        if (matrix.IsDeleted)
            return new ExamUpdateFromMatrixResponse
            {
                IsSuccess = false,
                Message = "Matrix is deleted!"
            };

        var selectedQuestions = (await _practicequestionRepository.GetAllAsync(new PracticequestionGetAllQuery
        {
            GradeLevelId = exam.GradeLevelId,
            CreatedBy = exam.CreatedByNavigationUserId
        })).Where(q => request.QuestionIds.Contains(q.QuestionId)).ToList();

        if (selectedQuestions.Count != request.QuestionIds.Count)
            return new ExamUpdateFromMatrixResponse
            {
                IsSuccess = false,
                Message = "Some questions not found."
            };

        foreach (var detail in matrix.Exammatrixdetails)
        {
            var matched = selectedQuestions
                .Where(q => q.QuestionType == detail.QuestionType && q.Difficulty == detail.Difficulty)
                .ToList();

            if (matched.Count() != detail.Quantity)
                return new ExamUpdateFromMatrixResponse
                {
                    IsSuccess = false,
                    Message =
                        $"Matrix detail mismatch for {detail.LessonName}. Expect {detail.Quantity}, got {matched.Count}."
                };
        }

        var invalid = selectedQuestions
            .Where(q => !matrix.Exammatrixdetails.Any(md =>
                md.QuestionType == q.QuestionType && md.Difficulty == q.Difficulty))
            .ToList();

        if (invalid.Any())
        {
            var ids = string.Join(", ", invalid.Select(q => q.QuestionId));
            return new ExamUpdateFromMatrixResponse
            {
                IsSuccess = false,
                Message = $"Questions [{ids}] do not match matrix type/difficulty."
            };
        }

        exam.Title = request.Title ?? exam.Title;
        exam.Description = request.Description ?? exam.Description;
        exam.DurationMinutes = request.DurationMinutes;
        exam.ExamTypeId = request.ExamTypeId;
        exam.GradeLevelId = matrix.GradeLevelId;

        var result = await _examRepository.UpdateWithQuestionsAsync(exam, request.QuestionIds);

        return new ExamUpdateFromMatrixResponse
        {
            IsSuccess = result,
            Message = result ? "Exam updated successfully!" : "Exam update failed."
        };
    }
}