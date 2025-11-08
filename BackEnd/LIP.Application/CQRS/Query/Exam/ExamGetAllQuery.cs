using MediatR;

namespace LIP.Application.CQRS.Query.Exam;

public class ExamGetAllQuery : IRequest<IEnumerable<Domain.Entities.Exam>>
{
    public int? GradeLevelId { get; set; }

    //public int? SeriesId { get; set; }
    public int? ExamTypeId { get; set; }
    public int? CreatedBy { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}