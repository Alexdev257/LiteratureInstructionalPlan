using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examanswer;

public class ExamanswerUpdateCommandHandler : IRequestHandler<ExamanswerUpdateCommand, bool>
{
    private readonly IExamanswerRepository _examanswerRepository;

    public ExamanswerUpdateCommandHandler(IExamanswerRepository examanswerRepository)
    {
        _examanswerRepository = examanswerRepository;
    }

    public async Task<bool> Handle(ExamanswerUpdateCommand request, CancellationToken cancellationToken)
    {
        return await _examanswerRepository.UpdateAsync(request);
    }
}