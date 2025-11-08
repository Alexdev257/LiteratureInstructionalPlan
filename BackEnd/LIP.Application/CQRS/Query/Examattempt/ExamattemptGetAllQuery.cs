using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Examattempt;

public class ExamattemptGetAllQuery : IRequest<IEnumerable<ExamAttempt>>
{
    public int? ExamId { get; set; }
    public int? UserId { get; set; }
    public string? Status { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}