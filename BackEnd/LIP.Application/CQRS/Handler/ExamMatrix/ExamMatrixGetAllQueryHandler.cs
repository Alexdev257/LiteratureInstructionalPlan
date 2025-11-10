using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.ExamMatrix;

public class ExamMatrixGetAllQueryHandler : IRequestHandler<ExamMatrixGetAllQuery, ExamMatrixGetAllResponse>
{
    private readonly IExamMatrixRepository _examMatrixRepository;

    public ExamMatrixGetAllQueryHandler(IExamMatrixRepository examMatrixRepository)
    {
        _examMatrixRepository = examMatrixRepository;
    }

    public async Task<ExamMatrixGetAllResponse> Handle(ExamMatrixGetAllQuery request,
        CancellationToken cancellationToken)
    {
        var rs = await _examMatrixRepository.GetAllAsync(request);
        //if (rs == null || !rs.Any())
        //    return new ExamMatrixGetAllResponse
        //    {
        //        IsSuccess = false,
        //        Message = "No Matrixes in the system!"
        //    };
        //int totalquestion = 0;
        //decimal totalpoint = 0;
        //foreach (var r in rs)
        //{
        //    foreach(var Exammatrixdetails in r.Exammatrixdetails)
        //    {
        //        totalquestion += Exammatrixdetails.Quantity!.Value;
        //        totalpoint += Exammatrixdetails.ScorePerQuestion!.Value * (decimal)Exammatrixdetails.Quantity;
        //    }
        //}

        var dataList = rs.Select(m =>
        { 
            int totalquestion = 0;
            decimal totalpoint = 0;

            foreach (var detail in m.Exammatrixdetails)
            {
                totalquestion += detail.Quantity ?? 0;
                totalpoint += (detail.ScorePerQuestion ?? 0) * (detail.Quantity ?? 0);
            }

            return new ExamMatrixGetAllResponseDTO
            {
                MatrixId = m.MatrixId,
                Title = m.Title,
                Description = m.Description,
                GradeLevelId = m.GradeLevelId,
                CreatedByUserId = m.CreatedByNavigationUserId,
                CreatedAt = m.CreatedAt,
                Status = m.Status,
                Notes = m.Notes,
                TotalQuestions = totalquestion,
                TotalPoint = totalpoint,
                Details = m.Exammatrixdetails.Select(d => new ExamMatrixDetailResponseDTO
                {
                    ExamMatrixDetailId = d.ExamMatrixDetailId,
                    LessonName = d.LessonName,
                    QuestionType = d.QuestionType,
                    Difficulty = d.Difficulty,
                    Quantity = d.Quantity,
                    ScorePerQuestion = d.ScorePerQuestion
                }).ToList() ?? new List<ExamMatrixDetailResponseDTO>()
            };
        }).ToList();

        var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
        return new ExamMatrixGetAllResponse
        {
            IsSuccess = true,
            Data = paged,
            Message = paged.Items.Any()
                ? "Get All Matrixes successfully!"
                : "No Matrixes in system!"
        };
    }
}