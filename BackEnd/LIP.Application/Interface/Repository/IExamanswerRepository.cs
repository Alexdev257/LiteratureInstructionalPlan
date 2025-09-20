using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.CQRS.Query.Examanswer;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IExamanswerRepository
    {
        Task<Examanswer?> GetAsync(ExamanswerGetQuery query);
        Task<IEnumerable<Examanswer>> GetAllAsync(ExamanswerGetAllQuery query);
        Task<bool> CreateAsync(ExamanswerCreateCommand command);
        Task<bool> UpdateAsync(ExamanswerUpdateCommand command);
        Task<bool> DeleteAsync(ExamanswerDeleteCommand command);
    }
}