using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examanswer
{
    public class ExamanswerCreateCommandHandler : IRequestHandler<ExamanswerCreateCommand, bool>
    {
        private readonly IExamanswerRepository _examanswerRepository;

        public ExamanswerCreateCommandHandler(IExamanswerRepository examanswerRepository)
        {
            _examanswerRepository = examanswerRepository;
        }

        public async Task<bool> Handle(ExamanswerCreateCommand request, CancellationToken cancellationToken)
        {
            return await _examanswerRepository.CreateAsync(request);
        }
    }
}