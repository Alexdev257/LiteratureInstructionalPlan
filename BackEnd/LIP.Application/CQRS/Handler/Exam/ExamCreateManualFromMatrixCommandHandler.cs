using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Exam
{
    public class ExamCreateManualFromMatrixCommandHandler : IRequestHandler<ExamCreateManualFromMatrixCommand, ExamCreateManualFromMatrixResponse>
    {
        private readonly IExamRepository _examRepository;
        private readonly IExamMatrixRepository _examMatrixRepository;
        private readonly IPracticequestionRepository _practicequestionRepository;
        public ExamCreateManualFromMatrixCommandHandler(IExamRepository examRepository, IExamMatrixRepository examMatrixRepository, IPracticequestionRepository practicequestionRepository)
        {
            _examRepository = examRepository;
            _examMatrixRepository = examMatrixRepository;
            _practicequestionRepository = practicequestionRepository;
        }
        public async Task<ExamCreateManualFromMatrixResponse> Handle(ExamCreateManualFromMatrixCommand request, CancellationToken cancellationToken)
        {
            var matrix = await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery
            {
                MatrixId = request.MatrixId,
                IsAdmin = true,
            });

            if (matrix == null)
            {
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = false,
                    Message = "Matrix is not exist in system!",
                };
            }

            if (matrix.IsDeleted)
            {
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = false,
                    Message = "Matrix is deleted!",
                };
            }
            // retrieve questions whom created them
            var allQuestions = await _practicequestionRepository.GetAllAsync(new PracticequestionGetAllQuery
            {
                CreatedBy = request.CreatedByNavigationUserId,
                GradeLevelId = request.GradeLevelId,
            });

            if (!allQuestions.Any())
            {
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = false,
                    Message = "You have no available questions for this grade level!"
                };
            }

            var selectedQuestions = allQuestions
                .Where(q => request.QuestionIds.Contains(q.QuestionId))
                .ToList();

            if (selectedQuestions.Count != request.QuestionIds.Count)
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = false,
                    Message = "Some questions do not exist."
                };

            foreach (var detail in matrix.Exammatrixdetails)
            {
                var matchedQuestions = selectedQuestions
                    .Where(q => q.QuestionType == detail.QuestionType &&
                                q.Difficulty == detail.Difficulty).ToList();

                if (matchedQuestions.Count() != detail.Quantity)
                {
                    return new ExamCreateManualFromMatrixResponse
                    {
                        IsSuccess = false,
                        Message = $"Invalid number of questions for '{detail.LessonName}' ({detail.QuestionType}-{detail.Difficulty}). Expected {detail.Quantity}, got {matchedQuestions.Count()}.",
                    };
                }
            }

            var invalidQuestions = selectedQuestions
                .Where(q => !matrix.Exammatrixdetails
                .Any(md => md.QuestionType == q.QuestionType &&
                           md.Difficulty == q.Difficulty))
                .ToList();

            if (invalidQuestions.Any())
            {
                var invalidIds = string.Join(", ", invalidQuestions.Select(q => q.QuestionId));
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = false,
                    Message = $"Questions [{invalidIds}] have invalid type/difficulty for this matrix."
                };
            }

            var exam = new LIP.Domain.Entities.Exam
            {
                Title = request.Title ?? matrix.Title,
                Description = request.Description ?? $"Exam created from matrix {matrix.Title}",
                DurationMinutes = request.DurationMinutes,
                GradeLevelId = request.GradeLevelId,
                ExamTypeId = request.ExamTypeId,
                MatrixId = matrix.MatrixId,
                CreatedByNavigationUserId = request.CreatedByNavigationUserId,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false,
            };

            var rs = await _examRepository.CreateWithQuestionsAsync(exam, selectedQuestions);
            if (rs)
            {
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = true,
                    Message = "Create Exam successfully!"
                };
            }
            else
            {
                return new ExamCreateManualFromMatrixResponse
                {
                    IsSuccess = false,
                    Message = "Create Exam failed!"
                };
            }
        }
    }
}
