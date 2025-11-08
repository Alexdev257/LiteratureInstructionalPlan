using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamRestoreCommandHandler : IRequestHandler<ExamRestoreCommand, ExamRestoreResponse>
{
    private readonly IExamRepository _examRepository;

    public ExamRestoreCommandHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<ExamRestoreResponse> Handle(ExamRestoreCommand request, CancellationToken cancellationToken)
    {
        var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = request.ExamId, IsAdmin = true });
        if (exam == null)
            return new ExamRestoreResponse
            {
                IsSuccess = false,
                Message = "Exam is not found!"
            };
        var rs = await _examRepository.RestoreAsync(request);
        if (rs)
            return new ExamRestoreResponse
            {
                IsSuccess = true,
                Message = "Restore Exam successfully!"
            };

        return new ExamRestoreResponse
        {
            IsSuccess = false,
            Message = "Restore Exam failed!"
        };
    }
}