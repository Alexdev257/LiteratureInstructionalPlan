using LIP.Application.CQRS.Command.Answerguide;
using LIP.Application.CQRS.Query.Answerguide;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IAnswerguideRepository
    {
        Task<Answerguide?> GetAsync(AnswerguideGetQuery query);
        Task<IEnumerable<Answerguide>> GetAllAsync(AnswerguideGetAllQuery query);
        Task<bool> CreateAsync(AnswerguideCreateCommand command);
        Task<bool> UpdateAsync(AnswerguideUpdateCommand command);
        Task<bool> DeleteAsync(AnswerguideDeleteCommand command);
    }
}