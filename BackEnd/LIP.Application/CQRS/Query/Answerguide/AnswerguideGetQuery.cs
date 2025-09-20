using MediatR;
using LIP.Domain.Entities;
namespace LIP.Application.CQRS.Query.Answerguide
{
    public class AnswerguideGetQuery : IRequest<LIP.Domain.Entities.Answerguide?>
    {
        public int AnswerGuideId { get; set; }
    }
}