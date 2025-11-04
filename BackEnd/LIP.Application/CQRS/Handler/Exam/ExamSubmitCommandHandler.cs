using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Exam
{
    public class ExamSubmitCommandHandler : IRequestHandler<ExamSubmitCommand, ExamSubmitResponse>
    {
        private readonly IExamattemptRepository _examattemptRepository;
        private readonly IExamanswerRepository _examanswerRepository;
        private readonly IExamRepository _examRepository;
        public ExamSubmitCommandHandler(IExamattemptRepository examattemptRepository, IExamanswerRepository examanswerRepository, IExamRepository examRepository)
        {
            _examattemptRepository = examattemptRepository;
            _examanswerRepository = examanswerRepository;
            _examRepository = examRepository;
        }
        public async Task<ExamSubmitResponse> Handle(ExamSubmitCommand request, CancellationToken cancellationToken)
        {
            var attempt = await _examattemptRepository.GetAsync(new ExamattemptGetQuery { AttemptId = request.AttemptId, IsAdmin = true });
            if (attempt == null)
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Attempt for this exam is not found!"
                };
            }
            if (attempt.IsDeleted)
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Attempt for this exam is deleted!"
                };
            }
            if(attempt.Status != "InProgress")
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Attempt for this exam is submitted or disabled!"
                };
            }

            var exam = await _examRepository.GetAsync(new Query.Exam.ExamGetQuery { ExamId = attempt.ExamId!.Value });
            if (exam == null)
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Exam is not found!"
                };
            }

            var validQuestionIds = exam.Questions.Select(x => x.QuestionId).ToHashSet();
            var submittedQuestionIds = request.Answers.Select(a => a.QuestionId).ToList();
            var invalidQuestionIds = submittedQuestionIds.Where(id => !validQuestionIds.Contains(id)).ToList();

            if (invalidQuestionIds.Any())
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = $"Invalid questions in submission: {string.Join(", ", invalidQuestionIds)}"
                };
            }

            bool isAllAnswerSaved = true;
            foreach(var examAnswer in request.Answers)
            {
                var savedResult = await _examanswerRepository.CreateAsync(new Command.Examanswer.ExamanswerCreateCommand
                {
                    AttemptId = request.AttemptId,
                    QuestionId = examAnswer.QuestionId,
                    AnswerContent = examAnswer.AnswerContent,
                });
                if (!savedResult)
                {
                    isAllAnswerSaved = false;
                    break;
                }
            }

            if (!isAllAnswerSaved)
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Something went wrong while saving answer!"
                };
            }

            var rs = await _examattemptRepository.UpdateAsync(new Command.Examattempt.ExamattemptUpdateCommand
            {
                AttemptId = attempt.AttemptId,
                ExamId = attempt.ExamId,
                UserId = attempt.UserId,
                StartTime = attempt.StartTime,
                EndTime = DateTime.UtcNow,
                Status = "Submitted",
                Score = attempt.Score,
                Feedback = attempt.Feedback,
                LastSavedAt = DateTime.UtcNow,
            });

            if (rs)
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = true,
                    Message = "Submit Exam successfully!"
                };
            }
            else
            {
                return new ExamSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Submit Exam failed!"
                };
            }

            
        }
    }
}
