using LIP.Application.CQRS.Command.Templatebooking;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface ITemplatebookingRepository
{
    Task<TemplateOrder?> GetAsync(TemplatebookingGetQuery query);
    Task<IEnumerable<TemplateOrder>> GetAllAsync(TemplatebookingGetAllQuery query);
    Task<IEnumerable<TemplateOrder>> GetByUserIdAsync(TemplatebookingGetByUserIdQuery query);
    Task<TemplateOrder> CreateAsync(TemplatebookingCreateCommand command);
    Task<TemplateOrder> UpdateAsync(TemplateOrder order);
    Task<bool> DeleteAsync(TemplatebookingDeleteCommand command);

    Task<IEnumerable<TemplateOrder>> GetByTemplateIdAsync(int templateId);
}