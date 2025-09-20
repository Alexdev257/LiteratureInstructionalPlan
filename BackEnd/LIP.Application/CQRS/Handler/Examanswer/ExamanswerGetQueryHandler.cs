using LIP.Application.CQRS.Query.Examanswer;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examanswer
{
    public class ExamanswerGetQueryHandler : IRequestHandler<ExamanswerGetQuery, LIP.Domain.Entities.Examanswer?>
    {
        private readonly IExamanswerRepository _examanswerRepository;

        public ExamanswerGetQueryHandler(IExamanswerRepository examanswerRepository)
        {
            _examanswerRepository = examanswerRepository;
        }

        public async Task<LIP.Domain.Entities.Examanswer?> Handle(ExamanswerGetQuery request, CancellationToken cancellationToken)
        {
            return await _examanswerRepository.GetAsync(request);
        }
    }
}