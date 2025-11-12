using LIP.Application.CQRS.Query.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamGetQueryHandler : IRequestHandler<ExamGetQuery, Domain.Entities.Exam?>
{
    private readonly IExamRepository _examRepository;

    public ExamGetQueryHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<Domain.Entities.Exam?> Handle(ExamGetQuery request, CancellationToken cancellationToken)
    {
        return await _examRepository.GetAsync(request);
    }
}