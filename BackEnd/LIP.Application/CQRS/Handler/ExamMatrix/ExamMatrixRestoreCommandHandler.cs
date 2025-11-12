using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.ExamMatrix;

public class ExamMatrixRestoreCommandHandler : IRequestHandler<ExamMatrixRestoreCommand, ExamMatrixRestoreResponse>
{
    private readonly IExamMatrixRepository _examMatrixRepository;

    public ExamMatrixRestoreCommandHandler(IExamMatrixRepository examMatrixRepository)
    {
        _examMatrixRepository = examMatrixRepository;
    }

    public async Task<ExamMatrixRestoreResponse> Handle(ExamMatrixRestoreCommand request,
        CancellationToken cancellationToken)
    {
        var check = await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery
            { MatrixId = request.MatrixId, IsAdmin = true });
        //var matrixes = await _examMatrixRepository.GetAllAsync(new ExamMatrixGetAllQuery { IsAdmin = true });
        //var check = matrixes.FirstOrDefault(m => m.MatrixId == request.MatrixId);
        if (check == null)
            return new ExamMatrixRestoreResponse
            {
                IsSuccess = false,
                Message = "Matrix is not found"
            };

        var rs = await _examMatrixRepository.RestoreAsync(request);
        if (rs)
            return new ExamMatrixRestoreResponse
            {
                IsSuccess = true,
                Message = "Restore Matrix successfully!"
            };

        return new ExamMatrixRestoreResponse
        {
            IsSuccess = false,
            Message = "Restore Matrix failed!"
        };
    }
}