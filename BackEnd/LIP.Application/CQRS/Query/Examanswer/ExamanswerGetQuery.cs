using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Examanswer;

public class ExamanswerGetQuery : IRequest<ExamAnswer?>
{
    public int AnswerId { get; set; }
}