using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface IExamtypeRepository
{
    Task<ExamType?> GetAsync(ExamtypeGetQuery query);
    Task<IEnumerable<ExamType>> GetAllAsync(ExamtypeGetAllQuery query);
    Task<bool> CreateAsync(ExamtypeCreateCommand command);
}