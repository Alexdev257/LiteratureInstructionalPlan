using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examattempt
{
    public class ExamattemptGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.ExamAttempt>>
    {
        public int? ExamId { get; set; }
        public int? UserId { get; set; }
        public string? Status { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}