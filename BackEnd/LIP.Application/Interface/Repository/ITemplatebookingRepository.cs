using LIP.Application.CQRS.Command.Templatebooking;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface ITemplatebookingRepository
{
    Task<TemplateOrder?> GetAsync(TemplatebookingGetQuery query);
    Task<IEnumerable<TemplateOrder>> GetAllAsync(TemplatebookingGetAllQuery query);
    Task<IEnumerable<TemplateOrder>> GetByUserIdAsync(TemplatebookingGetByUserIdQuery query);
    Task<bool> CreateAsync(TemplatebookingCreateCommand command);
    Task<bool> UpdateAsync(TemplatebookingUpdateCommand command);
    Task<bool> DeleteAsync(TemplatebookingDeleteCommand command);
}