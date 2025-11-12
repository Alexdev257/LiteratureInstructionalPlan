using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeUpdateCommandHandler : IRequestHandler<ExamtypeUpdateCommand, bool>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeUpdateCommandHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<bool> Handle(ExamtypeUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _examtypeRepository.UpdateAsync(request);
        }
    }
}