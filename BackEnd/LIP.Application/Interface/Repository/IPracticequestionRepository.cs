using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IPracticequestionRepository
    {
        Task<PracticeQuestion?> GetAsync(PracticequestionGetQuery query);
        Task<IEnumerable<PracticeQuestion>> GetAllAsync(PracticequestionGetAllQuery query);
        Task<bool> CreateAsync(PracticequestionCreateCommand command);
        Task<bool> UpdateAsync(PracticequestionUpdateCommand command);
        Task<bool> DeleteAsync(PracticequestionDeleteCommand command);
    }
}