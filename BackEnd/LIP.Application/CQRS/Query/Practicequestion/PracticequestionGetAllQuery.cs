using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Practicequestion;

public class PracticequestionGetAllQuery : IRequest<IEnumerable<PracticeQuestion>>
{
    public string? QuestionType { get; set; }

    public int? GradeLevelId { get; set; }

    //public int? SeriesId { get; set; }
    public string? Search { get; set; }
    public int? CreatedBy { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}