using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamSubmitCommandHandler : IRequestHandler<ExamSubmitCommand, ExamSubmitResponse>
{
    private readonly IExamanswerRepository _examanswerRepository;
    private readonly IExamattemptRepository _examattemptRepository;
    private readonly IExamRepository _examRepository;

    public ExamSubmitCommandHandler(IExamattemptRepository examattemptRepository,
        IExamanswerRepository examanswerRepository, IExamRepository examRepository)
    {
        _examattemptRepository = examattemptRepository;
        _examanswerRepository = examanswerRepository;
        _examRepository = examRepository;
    }

    public async Task<ExamSubmitResponse> Handle(ExamSubmitCommand request, CancellationToken cancellationToken)
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
            return new ExamSubmitResponse
            {
                IsSuccess = false,
                Message = "Attempt for this exam is not found!"
            };
        if (attempt.IsDeleted)
            return new ExamSubmitResponse
            {
                IsSuccess = false,
                Message = "Attempt for this exam is deleted!"
            };
        if (attempt.Status != "InProgress")
            return new ExamSubmitResponse
            {
                IsSuccess = false,
                Message = "Attempt for this exam is submitted or disabled!"
            };

        var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = attempt.ExamId!.Value });
        if (exam == null)
            return new ExamSubmitResponse
            {
                IsSuccess = false,
                Message = "Exam is not found!"
            };

        var validQuestionIds = exam.Questions.Select(x => x.QuestionId).ToHashSet();
        var submittedQuestionIds = request.Answers.Select(a => a.QuestionId).ToList();
        var invalidQuestionIds = submittedQuestionIds.Where(id => !validQuestionIds.Contains(id)).ToList();

        if (invalidQuestionIds.Any())
            return new ExamSubmitResponse
            {
                IsSuccess = false,
                Message = $"Invalid questions in submission: {string.Join(", ", invalidQuestionIds)}"
            };

        var isAllAnswerSaved = true;
        foreach (var examAnswer in request.Answers)
        {
            var existingAnswers = await _examanswerRepository.GetAllAsync(new Query.Examanswer.ExamanswerGetAllQuery { AttemptId = request.AttemptId, QuestionId = examAnswer.QuestionId });
            if (existingAnswers.Any())
            {
                var existingAnswer = existingAnswers.First();
                var oldContent = existingAnswer.AnswerContent?.Trim() ?? string.Empty;
                var newContent = examAnswer.AnswerContent?.Trim() ?? string.Empty;
                if (oldContent == newContent)
                {
                    continue;
                }
                else
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
            return new ExamSubmitResponse
            {
                IsSuccess = false,
                Message = "Something went wrong while saving answer!"
            };

        var rs = await _examattemptRepository.UpdateAsync(new ExamattemptUpdateCommand
        {
            AttemptId = attempt.AttemptId,
            ExamId = attempt.ExamId,
            UserId = attempt.UserId,
            StartTime = attempt.StartTime,
            EndTime = attempt.EndTime,
            Status = attempt.Status,
            Score = attempt.Score,
            Feedback = attempt.Feedback,
            LastSavedAt = DateTime.UtcNow
        });

        if (rs)
            return new ExamSubmitResponse
            {
                IsSuccess = true,
                Message = "Submit Exam successfully!"
            };

        return new ExamSubmitResponse
        {
            IsSuccess = false,
            Message = "Submit Exam failed!"
        };
    }
}