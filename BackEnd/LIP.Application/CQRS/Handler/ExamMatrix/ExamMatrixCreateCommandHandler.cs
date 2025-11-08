using LIP.Application.CQRS.Command.ExamMatrix;
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
            return new ExamMatrixCreateResponse
            {
                IsSuccess = true,
                Message = "Create Exam Matrix successfully!"
            };

        return new ExamMatrixCreateResponse
        {
            IsSuccess = false,
            Message = "Create Exam Matrix failed!"
        };
    }
}