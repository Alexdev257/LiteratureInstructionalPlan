using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IGradelevelRepository
    {
        Task<GradeLevel?> GetAsync(GradelevelGetQuery query);
        Task<IEnumerable<GradeLevel>> GetAllAsync(GradelevelGetAllQuery query);
        Task<bool> CreateAsync(GradelevelCreateCommand command);
    }
}