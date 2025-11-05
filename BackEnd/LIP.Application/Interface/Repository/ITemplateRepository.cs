using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface ITemplateRepository
    {
        Task<Template?> GetAsync(TemplateGetQuery query);
        Task<IEnumerable<Template>> GetAllAsync(TemplateGetAllQuery query);
        Task<bool> CreateAsync(TemplateCreateCommand command);
        Task<bool> DeleteAsync(TemplateDeleteCommand command);
        
        Task<IEnumerable<Template>> GetTemplateByUserIdAsync(TemplateGetByUserId query);
    }
}