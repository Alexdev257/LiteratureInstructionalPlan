using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Practicequestion
{
    public class PracticequestionGetQuery : IRequest<LIP.Domain.Entities.PracticeQuestion?>
    {
        public int QuestionId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}