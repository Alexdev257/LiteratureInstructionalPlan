using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IExamtypeRepository
    {
        Task<Examtype?> GetAsync(ExamtypeGetQuery query);
        Task<IEnumerable<Examtype>> GetAllAsync(ExamtypeGetAllQuery query);
        Task<bool> CreateAsync(ExamtypeCreateCommand command);
        Task<bool> UpdateAsync(ExamtypeUpdateCommand command);
        Task<bool> DeleteAsync(ExamtypeDeleteCommand command);
    }
}