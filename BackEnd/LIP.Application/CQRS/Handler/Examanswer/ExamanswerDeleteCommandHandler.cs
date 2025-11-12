using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examanswer;

public class ExamanswerDeleteCommandHandler : IRequestHandler<ExamanswerDeleteCommand, bool>
{
    private readonly IExamanswerRepository _examanswerRepository;

    public ExamanswerDeleteCommandHandler(IExamanswerRepository examanswerRepository)
    {
        _examanswerRepository = examanswerRepository;
    }

    public async Task<bool> Handle(ExamanswerDeleteCommand request, CancellationToken cancellationToken)
    {
        return await _examanswerRepository.DeleteAsync(request);
    }
}