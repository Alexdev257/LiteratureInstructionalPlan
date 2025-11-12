using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IExamattemptRepository
    {
        Task<Examattempt?> GetAsync(ExamattemptGetQuery query);
        Task<IEnumerable<Examattempt>> GetAllAsync(ExamattemptGetAllQuery query);
        Task<bool> CreateAsync(ExamattemptCreateCommand command);
        Task<bool> UpdateAsync(ExamattemptUpdateCommand command);
        Task<bool> DeleteAsync(ExamattemptDeleteCommand command);
    }
}