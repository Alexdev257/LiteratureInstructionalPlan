using LIP.Application.CQRS.Command.Exam;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam
{
    public class ExamDeleteCommandHandler : IRequestHandler<ExamDeleteCommand, bool>
    {
        private readonly IExamRepository _examRepository;

        public ExamDeleteCommandHandler(IExamRepository examRepository)
        {
            _examRepository = examRepository;
        }

        public async Task<bool> Handle(ExamDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _examRepository.DeleteAsync(request);
        }
    }
}