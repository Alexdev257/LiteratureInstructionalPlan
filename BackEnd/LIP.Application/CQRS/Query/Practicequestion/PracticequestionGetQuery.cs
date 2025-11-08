using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Practicequestion;

public class PracticequestionGetQuery : IRequest<PracticeQuestion?>
{
    public int QuestionId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}