using MediatR;

namespace LIP.Application.CQRS.Command.Template
{
    public class TemplateCreateCommand : IRequest<bool>
    {
        public string? Title { get; set; }
        public string? FilePath { get; set; }
        public int? GradeLevelId { get; set; }
        public int? SeriesId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}