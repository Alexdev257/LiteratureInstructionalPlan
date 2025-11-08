using LIP.Application.CQRS.Command.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamUpdateCommandHandler : IRequestHandler<ExamUpdateCommand, bool>
{
    private readonly IExamRepository _examRepository;

    public ExamUpdateCommandHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<bool> Handle(ExamUpdateCommand request, CancellationToken cancellationToken)
    {
        return await _examRepository.UpdateAsync(request);
    }
}