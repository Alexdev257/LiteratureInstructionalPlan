using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamStartCommandHandler : IRequestHandler<ExamStartCommand, ExamStartResponse>
{
    private readonly IExamattemptRepository _examattemptRepository;
    private readonly IExamRepository _examRepository;
    private readonly IUserRepository _userRepository;

    public ExamStartCommandHandler(IUserRepository userRepository, IExamRepository examRepository,
        IExamattemptRepository examattemptRepository)
    {
        _userRepository = userRepository;
        _examRepository = examRepository;
        _examattemptRepository = examattemptRepository;
    }

    public async Task<ExamStartResponse> Handle(ExamStartCommand request, CancellationToken cancellationToken)
    {
        var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = request.ExamId, IsAdmin = true });
        if (exam == null)
            return new ExamStartResponse
            {
                IsSuccess = false,
                Message = "Exam is not found!"
            };
        if (exam.IsDeleted)
            return new ExamStartResponse
            {
                IsSuccess = false,
                Message = "Exam is deleted!"
            };

        var user = await _userRepository.GetAsync(new UserGetQuery { UserId = request.UserId, IsAdmin = true });
        if (user == null)
            return new ExamStartResponse
            {
                IsSuccess = false,
                Message = "User is not found!"
            };
        if (user.IsDeleted)
            return new ExamStartResponse
            {
                IsSuccess = false,
                Message = "User is deleted!"
            };

        var attempt = new ExamattemptCreateCommand
        {
            ExamId = request.ExamId,
            UserId = request.UserId,
            StartTime = DateTime.UtcNow,
            EndTime = DateTime.UtcNow.AddMinutes(exam.DurationMinutes!.Value + 5),
            Status = "InProgress",
            Score = null,
            Feedback = null,
            LastSavedAt = null
        };

        var rs = await _examattemptRepository.CreateAsync(attempt);
        if (rs)
        {
            var attemptList = await _examattemptRepository.GetAllAsync(new Query.Examattempt.ExamattemptGetAllQuery { ExamId = request.ExamId, UserId = request.UserId });
            var attemptId = attemptList.OrderByDescending(a => a.AttemptId).Select(a => a.AttemptId).FirstOrDefault();
            return new ExamStartResponse
            {
                IsSuccess = true,
                Data = new ExamStartResponseDTO
                {
                    AttemptId = attemptId,
                },
                Message =
                    $"Create Exam Attempt for User: {request.UserId.ToString()} - Exam: {request.ExamId.ToString()} successfully!"
            };
        }
        else
        {
            return new ExamStartResponse
            {
                IsSuccess = false,
                Message =
                $"Create Exam Attempt for User: {request.UserId.ToString()} - Exam: {request.ExamId.ToString()} failed!"
            };
        }
            

        
    }
}