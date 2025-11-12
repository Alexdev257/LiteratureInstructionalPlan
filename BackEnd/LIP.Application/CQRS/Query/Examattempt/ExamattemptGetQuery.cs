using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Examattempt;

public class ExamattemptGetQuery : IRequest<ExamAttempt?>
{
    public int AttemptId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}