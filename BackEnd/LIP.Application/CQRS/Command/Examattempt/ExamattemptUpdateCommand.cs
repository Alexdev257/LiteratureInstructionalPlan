using MediatR;

namespace LIP.Application.CQRS.Command.Examattempt
{
    public class ExamattemptUpdateCommand : IRequest<bool>
    {
        public int AttemptId { get; set; }
        public int? ExamId { get; set; }
        public int? UserId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? Status { get; set; }
        public decimal? Score { get; set; }
        public string? Feedback { get; set; }
        public DateTime? LastSavedAt { get; set; }
    }
}