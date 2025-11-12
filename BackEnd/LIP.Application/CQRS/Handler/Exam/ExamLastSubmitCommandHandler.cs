using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using LIP.Domain.Enum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LIP.Application.Interface.Helpers;

namespace LIP.Application.CQRS.Handler.Exam
{
    public class ExamLastSubmitCommandHandler : IRequestHandler<ExamLastSubmitCommand, ExamLastSubmitResponse>
    {
        private readonly IExamanswerRepository _examanswerRepository;
        private readonly IExamattemptRepository _examattemptRepository;
        private readonly IExamRepository _examRepository;
        private readonly IOpenAIService _openAIService;

        public ExamLastSubmitCommandHandler(IExamattemptRepository examattemptRepository,
            IExamanswerRepository examanswerRepository, IExamRepository examRepository, IOpenAIService openAiService)
        {
            _examattemptRepository = examattemptRepository;
            _examanswerRepository = examanswerRepository;
            _examRepository = examRepository;
            _openAIService = openAiService;
        }

        public async Task<ExamLastSubmitResponse> Handle(ExamLastSubmitCommand request, CancellationToken cancellationToken)
        {
            //var attempt = await _examattemptRepository.GetAsync(new ExamattemptGetQuery
            //    { AttemptId = request.AttemptId, IsAdmin = true });
            //if (attempt == null)
            //    return new ExamSubmitResponse
            //    {
            //        IsSuccess = false,
            //        Message = "Attempt for this exam is not found!"
            //    };
            //if (attempt.IsDeleted)
            //    return new ExamSubmitResponse
            //    {
            //        IsSuccess = false,
            //        Message = "Attempt for this exam is deleted!"
            //    };
            ////if (attempt.Status != "InProgress")
            ////    return new ExamSubmitResponse
            ////    {
            ////        IsSuccess = false,
            ////        Message = "Attempt for this exam is submitted or disabled!"
            ////    };

            //var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = attempt.ExamId!.Value });
            //if (exam == null)
            //    return new ExamSubmitResponse
            //    {
            //        IsSuccess = false,
            //        Message = "Exam is not found!"
            //    };

            //var validQuestionIds = exam.Questions.Select(x => x.QuestionId).ToHashSet();
            //var submittedQuestionIds = request.Answers.Select(a => a.QuestionId).ToList();
            //var invalidQuestionIds = submittedQuestionIds.Where(id => !validQuestionIds.Contains(id)).ToList();

            //if (invalidQuestionIds.Any())
            //    return new ExamSubmitResponse
            //    {
            //        IsSuccess = false,
            //        Message = $"Invalid questions in submission: {string.Join(", ", invalidQuestionIds)}"
            //    };

            //var isAllAnswerSaved = true;
            //foreach (var examAnswer in request.Answers)
            //{
            //    var savedResult = await _examanswerRepository.CreateAsync(new ExamanswerCreateCommand
            //    {
            //        AttemptId = request.AttemptId,
            //        QuestionId = examAnswer.QuestionId,
            //        AnswerContent = examAnswer.AnswerContent
            //    });
            //    if (!savedResult)
            //    {
            //        isAllAnswerSaved = false;
            //        break;
            //    }
            //}

            //if (!isAllAnswerSaved)
            //    return new ExamSubmitResponse
            //    {
            //        IsSuccess = false,
            //        Message = "Something went wrong while saving answer!"
            //    };

            //var rs = await _examattemptRepository.UpdateAsync(new ExamattemptUpdateCommand
            //{
            //    AttemptId = attempt.AttemptId,
            //    ExamId = attempt.ExamId,
            //    UserId = attempt.UserId,
            //    StartTime = attempt.StartTime,
            //    EndTime = DateTime.UtcNow,
            //    Status = "Submitted",
            //    Score = attempt.Score,
            //    Feedback = attempt.Feedback,
            //    LastSavedAt = DateTime.UtcNow
            //});

            //if (rs)
            //    return new ExamSubmitResponse
            //    {
            //        IsSuccess = true,
            //        Message = "Submit Exam successfully!"
            //    };

            //return new ExamSubmitResponse
            //{
            //    IsSuccess = false,
            //    Message = "Submit Exam failed!"
            //};



            var attempt = await _examattemptRepository.GetAsync(new ExamattemptGetQuery
            { AttemptId = request.AttemptId, IsAdmin = true });
            if (attempt == null)
                return new ExamLastSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Attempt for this exam is not found!"
                };
            if (attempt.IsDeleted)
                return new ExamLastSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Attempt for this exam is deleted!"
                };
            if (attempt.Status != "InProgress")
                return new ExamLastSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Attempt for this exam is submitted or disabled!"
                };

            var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = attempt.ExamId!.Value });
            if (exam == null)
                return new ExamLastSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Exam is not found!"
                };

            var validQuestionIds = exam.Questions.Select(x => x.QuestionId).ToHashSet();
            var submittedQuestionIds = request.Answers.Select(a => a.QuestionId).ToList();
            var invalidQuestionIds = submittedQuestionIds.Where(id => !validQuestionIds.Contains(id)).ToList();

            if (invalidQuestionIds.Any())
                return new ExamLastSubmitResponse
                {
                    IsSuccess = false,
                    Message = $"Invalid questions in submission: {string.Join(", ", invalidQuestionIds)}"
                };

            var isAllAnswerSaved = true;
            foreach (var examAnswer in request.Answers)
            {
                var existingAnswers = await _examanswerRepository.GetAllAsync(new Query.Examanswer.ExamanswerGetAllQuery { AttemptId = request.AttemptId, QuestionId = examAnswer.QuestionId });
                // materialize and use FirstOrDefault to avoid multiple enumeration
                var existingAnswer = existingAnswers.FirstOrDefault();
                if (existingAnswer != null)
                {
                    var oldContent = existingAnswer.AnswerContent?.Trim() ?? string.Empty;
                    var newContent = examAnswer.AnswerContent?.Trim() ?? string.Empty;
                    if (oldContent != newContent)
                    {
                        var updatedResult = await _examanswerRepository.UpdateAsync(new ExamanswerUpdateCommand
                        {
                            AnswerId = existingAnswer.AnswerId,
                            AttemptId = existingAnswer.AttemptId,
                            QuestionId = existingAnswer.QuestionId,
                            AnswerContent = examAnswer.AnswerContent,
                        });
                        if (!updatedResult)
                        {
                            isAllAnswerSaved = false;
                            break;
                        }
                    }
                }
                else
                {
                    var savedResult = await _examanswerRepository.CreateAsync(new ExamanswerCreateCommand
                    {
                        AttemptId = request.AttemptId,
                        QuestionId = examAnswer.QuestionId,
                        AnswerContent = examAnswer.AnswerContent
                    });
                    if (!savedResult)
                    {
                        isAllAnswerSaved = false;
                        break;
                    }
                }
            }

            if (!isAllAnswerSaved)
                return new ExamLastSubmitResponse
                {
                    IsSuccess = false,
                    Message = "Something went wrong while saving answer!"
                };

            decimal score = 0;
            // initialize feedback from existing attempt if available
            var feedback = attempt.Feedback ?? string.Empty;
            var studentResult = await _examRepository.GetExamResultsByAttemptAsync(request.AttemptId);
            var examAIResult = new List<ExamAIHelper>();
            foreach(var result in studentResult)
            {
                if (result.StudentAnswer == null || !result.StudentAnswer.Any())
                {
                    continue;
                }
                if(result.QuestionType == ((int)QuestionTypeEnum.Text).ToString())
                {
                    examAIResult.Add(new ExamAIHelper
                    {
                        CorrectAnswer = (result.CorrectAnswer == null) ? "" : result.CorrectAnswer.First().Text!,
                        UserAnswer = result.StudentAnswer.First().Text!,
                        QuestionContent = result.QuestionContent!,
                        Score =(decimal)result.ScorePerQuestion!
                    });
                    continue;
                }
                if (result.QuestionType == ((int)QuestionTypeEnum.SingleChoice).ToString())
                {
                    var studentLabel = result.StudentAnswer?.First().Label?.Trim().ToLower();
                    var correctLabel = result.CorrectAnswer?.First().Label?.Trim().ToLower();

                    if(studentLabel == correctLabel)
                    {
                        score += result.ScorePerQuestion!.Value;
                    }
                }

                if(result.QuestionType == ((int)QuestionTypeEnum.MultipleChoice).ToString())
                {
                    var studentLabels = result.StudentAnswer?
                        .Select(sa => sa.Label?.Trim().ToLower())
                        .Where(x => x != null)
                        .ToHashSet();

                    var correctLabels = result.CorrectAnswer?
                        .Select(ca => ca.Label?.Trim().ToLower())
                        .Where(x => x != null)
                        .ToHashSet();

                    if (studentLabels == null || correctLabels == null)
                     {
                         continue;
                     }

                    var totalCorrectCount = correctLabels.Count;
                    if (totalCorrectCount == 0) continue;

                    var correctAmount = studentLabels.Intersect(correctLabels).Count();
                    decimal partialScore = ((decimal)correctAmount / totalCorrectCount) * result.ScorePerQuestion!.Value;
                     score += partialScore;
                 }
             }

            // Call AI only when there are text answers to evaluate
            if (examAIResult.Any())
            {
                var (aiScore, aiFeedback) = await _openAIService.EvaluateAnswerAsync(examAIResult);
                score += aiScore;
                feedback = aiFeedback;
            }
            
            var rs = await _examattemptRepository.UpdateAsync(new ExamattemptUpdateCommand
            {
                AttemptId = attempt.AttemptId,
                ExamId = attempt.ExamId,
                UserId = attempt.UserId,
                StartTime = attempt.StartTime,
                EndTime = DateTime.UtcNow,
                Status = "Submitted",
                Score = score,
                Feedback = feedback,
                LastSavedAt = DateTime.UtcNow
            });

            if (rs)
                return new ExamLastSubmitResponse
                {
                    IsSuccess = true,
                    Data = new ExamLastSubmitResponseDTO
                    {
                        FeedBack = feedback,
                        Score = score,
                    },
                    Message = "Submit Exam successfully!"
                };

            return new ExamLastSubmitResponse
            {
                IsSuccess = false,
                Message = "Submit Exam failed!"
            };
        }
    }
}
