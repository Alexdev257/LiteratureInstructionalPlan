using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamDeleteCommandHandler : IRequestHandler<ExamDeleteCommand, ExamDeleteResponse>
{
    private readonly IExamRepository _examRepository;

    public ExamDeleteCommandHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<ExamDeleteResponse> Handle(ExamDeleteCommand request, CancellationToken cancellationToken)
    {
        var exam = await _examRepository.GetAsync(new ExamGetQuery { ExamId = request.ExamId });
        if (exam == null)
            return new ExamDeleteResponse
            {
                IsSuccess = false,
                Message = "Exam is not found!"
            };
        var rs = await _examRepository.DeleteAsync(request);
        if (rs)
            return new ExamDeleteResponse
            {
                IsSuccess = true,
                Message = "Delete Exam successfully!"
            };

        return new ExamDeleteResponse
        {
            IsSuccess = false,
            Message = "Delete Exam failed!"
        };
    }

    //public async Task<bool> Handle(ExamDeleteCommand request, CancellationToken cancellationToken)
    //{
    //    return await _examRepository.DeleteAsync(request);
    //}
}