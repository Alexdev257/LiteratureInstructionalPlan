using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.ExamMatrix;

public class ExamMatrixUpdateCommandHandler : IRequestHandler<ExamMatrixUpdateCommand, ExamMatrixUpdateResponse>
{
    private readonly IExamMatrixRepository _examMatrixRepository;

    public ExamMatrixUpdateCommandHandler(IExamMatrixRepository examMatrixRepository)
    {
        _examMatrixRepository = examMatrixRepository;
    }

    public async Task<ExamMatrixUpdateResponse> Handle(ExamMatrixUpdateCommand request,
        CancellationToken cancellationToken)
    {
        var check = await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery { MatrixId = request.MatrixId });
        var rs = await _examMatrixRepository.UpdateAsync(request);
        if (rs)
        {
            var curMatrix =
                await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery { MatrixId = request.MatrixId });
            var totalQuestions = 0;
            decimal totalPoint = 0;
            foreach (var detail in curMatrix.Exammatrixdetails)
            {
                totalQuestions += detail.Quantity!.Value;
                totalPoint += detail.ScorePerQuestion!.Value * detail.Quantity!.Value;
            }

            var dto = new ExamMatrixUpdateResponseDTO
            {
                MatrixId = curMatrix.MatrixId,
                Title = curMatrix.Title,
                Description = curMatrix.Description,
                GradeLevelId = curMatrix.GradeLevelId,
                CreatedByUserId = curMatrix.CreatedByNavigationUserId,
                CreatedAt = curMatrix.CreatedAt,
                Status = curMatrix.Status,
                Notes = curMatrix.Notes,
                TotalQuestions = totalQuestions,
                TotalPoint = totalPoint,
                Details = curMatrix.Exammatrixdetails.Select(d => new ExamMatrixDetailResponseDTO
                {
                    ExamMatrixDetailId = d.ExamMatrixDetailId,
                    LessonName = d.LessonName,
                    QuestionType = d.QuestionType,
                    Difficulty = d.Difficulty,
                    Quantity = d.Quantity,
                    ScorePerQuestion = d.ScorePerQuestion
                }).ToList()
            };

            return new ExamMatrixUpdateResponse
            {
                IsSuccess = true,
                Data = dto,
                Message = "Update Exam Matrix successfully!"
            };
        }

        return new ExamMatrixUpdateResponse
        {
            IsSuccess = false,
            Message = "Update Exam Matrix failed!"
        };
    }
}