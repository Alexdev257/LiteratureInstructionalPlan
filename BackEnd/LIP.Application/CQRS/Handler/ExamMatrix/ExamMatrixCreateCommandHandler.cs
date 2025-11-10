using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.ExamMatrix;

public class ExamMatrixCreateCommandHandler : IRequestHandler<ExamMatrixCreateCommand, ExamMatrixCreateResponse>
{
    private readonly IExamMatrixDetailRepository _examMatrixDetailRepository;
    private readonly IExamMatrixRepository _examMatrixRepository;

    public ExamMatrixCreateCommandHandler(IExamMatrixRepository examMatrixRepository,
        IExamMatrixDetailRepository examMatrixDetailRepository)
    {
        _examMatrixRepository = examMatrixRepository;
        _examMatrixDetailRepository = examMatrixDetailRepository;
    }

    public async Task<ExamMatrixCreateResponse> Handle(ExamMatrixCreateCommand request,
        CancellationToken cancellationToken)
    {
        var rs = await _examMatrixRepository.CreateAsync(request);
        if (rs)
        {
            var curMatrixList = await _examMatrixRepository.GetAllAsync(new Query.ExamMatrix.ExamMatrixGetAllQuery { });
            var curMatrix = curMatrixList.OrderByDescending(u => u.MatrixId).FirstOrDefault();
            int totalQuestions = 0;
            decimal totalPoint = 0;
            foreach(var detail in curMatrix.Exammatrixdetails)
            {
                totalQuestions += detail.Quantity!.Value;
                totalPoint += detail.ScorePerQuestion!.Value * (decimal)detail.Quantity!.Value;
            }
            var dto = new ExamMatrixCreateResponseDTO
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
                    ScorePerQuestion = d.ScorePerQuestion,
                }).ToList(),
            };
            return new ExamMatrixCreateResponse
            {
                IsSuccess = true,
                Data = dto,
                Message = "Create Exam Matrix successfully!"
            };
        }
        else
        {
            return new ExamMatrixCreateResponse
            {
                IsSuccess = false,
                Message = "Create Exam Matrix failed!"
            };
        }        
    }
}