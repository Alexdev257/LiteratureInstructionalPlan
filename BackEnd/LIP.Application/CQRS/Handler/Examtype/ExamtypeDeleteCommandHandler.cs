using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeDeleteCommandHandler : IRequestHandler<ExamtypeDeleteCommand, bool>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeDeleteCommandHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<bool> Handle(ExamtypeDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _examtypeRepository.DeleteAsync(request);
        }
    }
}