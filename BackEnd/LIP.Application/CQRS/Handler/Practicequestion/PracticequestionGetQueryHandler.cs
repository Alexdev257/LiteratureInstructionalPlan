using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class PracticequestionGetQueryHandler : IRequestHandler<PracticequestionGetQuery, PracticeQuestion?>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public PracticequestionGetQueryHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<PracticeQuestion?> Handle(PracticequestionGetQuery request, CancellationToken cancellationToken)
    {
        return await _practicequestionRepository.GetAsync(request);
    }
}