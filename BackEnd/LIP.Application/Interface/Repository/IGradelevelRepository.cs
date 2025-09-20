using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IGradelevelRepository
    {
        Task<Gradelevel?> GetAsync(GradelevelGetQuery query);
        Task<IEnumerable<Gradelevel>> GetAllAsync(GradelevelGetAllQuery query);
        Task<bool> CreateAsync(GradelevelCreateCommand command);
        Task<bool> UpdateAsync(GradelevelUpdateCommand command);
        Task<bool> DeleteAsync(GradelevelDeleteCommand command);
    }
}