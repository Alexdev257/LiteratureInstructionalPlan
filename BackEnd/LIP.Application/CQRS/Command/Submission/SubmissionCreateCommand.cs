using MediatR;

namespace LIP.Application.CQRS.Command.Submission
{
    public class SubmissionCreateCommand : IRequest<bool>
    {
        public int? ExamId { get; set; }
        public int? StudentId { get; set; }
        public string? Content { get; set; }
        public float? AutoScore { get; set; }
        public string? AiFeedback { get; set; }
        public string? Status { get; set; }
        public DateTime? SubmitTime { get; set; }
    }
}