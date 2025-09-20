using MediatR;

namespace LIP.Application.CQRS.Command.Practicequestion
{
    public class PracticequestionUpdateCommand : IRequest<bool>
    {
        public int QuestionId { get; set; }
        public string? Content { get; set; }
        public string? QuestionType { get; set; }
        public string? Answer { get; set; }
        public int? GradeLevelId { get; set; }
        public int? SeriesId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}