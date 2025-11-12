using LIP.Application.CQRS.Command.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam;

public class ExamCreateCommandHandler : IRequestHandler<ExamCreateCommand, bool>
{
    private readonly IExamRepository _examRepository;

    public ExamCreateCommandHandler(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<bool> Handle(ExamCreateCommand request, CancellationToken cancellationToken)
    {
        return await _examRepository.CreateAsync(request);
    }
}