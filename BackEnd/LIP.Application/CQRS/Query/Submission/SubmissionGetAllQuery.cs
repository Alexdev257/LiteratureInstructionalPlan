using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Submission
{
    public class SubmissionGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.Submission>>
    {
        public int? ExamId { get; set; }
        public int? StudentId { get; set; }
        public string? Status { get; set; }
    }
}