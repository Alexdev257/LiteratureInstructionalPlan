using MediatR;

namespace LIP.Application.CQRS.Command.Exam
{
    public class ExamUpdateCommand : IRequest<bool>
    {
        public int ExamId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? DurationMinutes { get; set; }
        public int? GradeLevelId { get; set; }
        public int? SeriesId { get; set; }
        public int? ExamTypeId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}