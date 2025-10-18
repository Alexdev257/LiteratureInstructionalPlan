using LIP.Application.CQRS.Command.Templatebooking;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface ITemplatebookingRepository
{
    Task<Templatebooking?> GetAsync(TemplatebookingGetQuery query);
    Task<IEnumerable<Templatebooking>> GetAllAsync(TemplatebookingGetAllQuery query);
    Task<IEnumerable<Templatebooking>> GetByUserIdAsync(TemplatebookingGetByUserIdQuery query);
    Task<bool> CreateAsync(TemplatebookingCreateCommand command);
    Task<bool> UpdateAsync(TemplatebookingUpdateCommand command);
    Task<bool> DeleteAsync(TemplatebookingDeleteCommand command);
}