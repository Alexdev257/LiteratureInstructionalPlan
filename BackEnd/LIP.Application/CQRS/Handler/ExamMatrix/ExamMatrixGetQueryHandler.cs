using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.ExamMatrix
{
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
            {
                return new ExamMatrixGetResponse
                {
                    IsSuccess = false,
                    Message = "Exam Matrix is not found"
                };
            }

            var matrixDTO = new ExamMatrixGetResponseDTO
            {
                MatrixId = rs.MatrixId,
                Title = rs.Title,
                Description = rs.Description,
                GradeLevelId = rs.GradeLevelId,
                CreatedByUserId = rs.CreatedByNavigationUserId,
                CreatedAt = rs.CreatedAt,
                Status = rs.Status,
                Notes = rs.Notes,
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
}
