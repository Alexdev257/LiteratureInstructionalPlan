using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examattempt;

public class ExamattemptGetAllQueryHandler : IRequestHandler<ExamattemptGetAllQuery, IEnumerable<ExamAttempt>>
{
    private readonly IExamattemptRepository _examattemptRepository;

    public ExamattemptGetAllQueryHandler(IExamattemptRepository examattemptRepository)
    {
        _examattemptRepository = examattemptRepository;
    }

    public async Task<IEnumerable<ExamAttempt>> Handle(ExamattemptGetAllQuery request,
        CancellationToken cancellationToken)
    {
        return await _examattemptRepository.GetAllAsync(request);
    }
}