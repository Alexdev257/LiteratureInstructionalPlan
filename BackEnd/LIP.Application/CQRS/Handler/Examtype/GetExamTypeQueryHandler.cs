using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype;

public class GetExamTypeQueryHandler : IRequestHandler<GetExamTypeQuery, GetExamTypeResponse>
{
    private readonly IExamtypeRepository _examtypeRepository;

    public GetExamTypeQueryHandler(IExamtypeRepository examtypeRepository)
    {
        _examtypeRepository = examtypeRepository;
    }

    public async Task<GetExamTypeResponse> Handle(GetExamTypeQuery request, CancellationToken cancellationToken)
    {
        var rs = await _examtypeRepository.GetAsync(new ExamtypeGetQuery { ExamTypeId = request.ExamTypeId });
        if (rs == null)
            return new GetExamTypeResponse
            {
                IsSuccess = false,
                Message = "ExamType is not exist!"
            };

        var responseDTO = new GetExamTypeResponseDTO
        {
            ExamTypeId = rs.ExamTypeId,
            Name = rs.Name
        };
        return new GetExamTypeResponse
        {
            IsSuccess = true,
            Data = responseDTO,
            Message = "Get ExamType successfully!"
        };
    }
}