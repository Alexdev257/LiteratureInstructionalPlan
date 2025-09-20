using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IExamRepository
    {
        Task<Exam?> GetAsync(ExamGetQuery query);
        Task<IEnumerable<Exam>> GetAllAsync(ExamGetAllQuery query);
        Task<bool> CreateAsync(ExamCreateCommand command);
        Task<bool> UpdateAsync(ExamUpdateCommand command);
        Task<bool> DeleteAsync(ExamDeleteCommand command);
    }
}