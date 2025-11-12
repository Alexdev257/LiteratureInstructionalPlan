using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.ExamMatrix;

public class ExamMatrixGetQueryHandler : IRequestHandler<ExamMatrixGetQuery, ExamMatrixGetResponse>
{
    private readonly IExamMatrixRepository _examMatrixRepository;

    public ExamMatrixGetQueryHandler(IExamMatrixRepository examMatrixRepository)
    {
        _examMatrixRepository = examMatrixRepository;
    }

    public async Task<ExamMatrixGetResponse> Handle(ExamMatrixGetQuery request, CancellationToken cancellationToken)
    {
        var rs = await _examMatrixRepository.GetAsync(request);
        if (rs == null)
            return new ExamMatrixGetResponse
            {
                IsSuccess = false,
                Message = "Exam Matrix is not found"
            };
        var totalQuestions = 0;
        decimal totalPoint = 0;
        foreach (var detail in rs.Exammatrixdetails)
        {
            totalQuestions += detail.Quantity!.Value;
            totalPoint += detail.ScorePerQuestion!.Value * detail.Quantity!.Value;
        }

        var matrixDTO = new ExamMatrixGetResponseDTO
        {
            MatrixId = rs.MatrixId,
            Title = rs.Title,
            Description = rs.Description,
            GradeLevel = rs.GradeLevel != null
                ? new GradeLevelDTO
                {
                    GradeLevelId = rs.GradeLevel.GradeLevelId,
                    Name = rs.GradeLevel.Name
                }
                : null!,
            CreatedBy = rs.CreatedByNavigation != null
                ? new CreatedByDTO
                {
                    UserId = rs.CreatedByNavigation.UserId,
                    FullName = rs.CreatedByNavigation.FullName,
                    Email = rs.CreatedByNavigation.Email
                }
                : null!,
            CreatedAt = rs.CreatedAt,
            Status = rs.Status,
            Notes = rs.Notes,
            TotalQuestions = totalQuestions,
            TotalPoint = totalPoint,
            Details = rs.Exammatrixdetails.Select(d => new ExamMatrixDetailResponseDTO
            {
                ExamMatrixDetailId = d.ExamMatrixDetailId,
                LessonName = d.LessonName,
                QuestionType = d.QuestionType,
                Difficulty = d.Difficulty,
                Quantity = d.Quantity,
                ScorePerQuestion = d.ScorePerQuestion
            }).ToList() ?? new List<ExamMatrixDetailResponseDTO>()
        };

        return new ExamMatrixGetResponse
        {
            IsSuccess = true,
            Data = matrixDTO,
            Message = "Get Matrix successfully!"
        };
    }
}