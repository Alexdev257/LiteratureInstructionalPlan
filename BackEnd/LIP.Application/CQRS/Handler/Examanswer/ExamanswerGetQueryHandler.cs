using LIP.Application.CQRS.Query.Examanswer;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examanswer;

public class ExamanswerGetQueryHandler : IRequestHandler<ExamanswerGetQuery, ExamAnswer?>
{
    private readonly IExamanswerRepository _examanswerRepository;

    public ExamanswerGetQueryHandler(IExamanswerRepository examanswerRepository)
    {
        _examanswerRepository = examanswerRepository;
    }

    public async Task<ExamAnswer?> Handle(ExamanswerGetQuery request, CancellationToken cancellationToken)
    {
        return await _examanswerRepository.GetAsync(request);
    }
}