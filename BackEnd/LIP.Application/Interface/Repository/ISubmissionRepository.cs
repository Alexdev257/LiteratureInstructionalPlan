using LIP.Application.CQRS.Command.Submission;
using LIP.Application.CQRS.Query.Submission;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface ISubmissionRepository
    {
        Task<Submission?> GetAsync(SubmissionGetQuery query);
        Task<IEnumerable<Submission>> GetAllAsync(SubmissionGetAllQuery query);
        Task<bool> CreateAsync(SubmissionCreateCommand command);
        Task<bool> UpdateAsync(SubmissionUpdateCommand command);
        Task<bool> DeleteAsync(SubmissionDeleteCommand command);
    }
}