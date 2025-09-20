using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Practicequestion
{
    public class PracticequestionGetQuery : IRequest<LIP.Domain.Entities.Practicequestion?>
    {
        public int QuestionId { get; set; }
    }
}