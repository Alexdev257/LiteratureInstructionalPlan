using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Examanswer;

public class ExamanswerGetAllQuery : IRequest<IEnumerable<ExamAnswer>>
{
    public int? AttemptId { get; set; }
    public int? QuestionId { get; set; }
}