using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeCreateCommandHandler : IRequestHandler<ExamtypeCreateCommand, bool>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeCreateCommandHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<bool> Handle(ExamtypeCreateCommand request, CancellationToken cancellationToken)
        {
            return await _examtypeRepository.CreateAsync(request);
        }
    }
}