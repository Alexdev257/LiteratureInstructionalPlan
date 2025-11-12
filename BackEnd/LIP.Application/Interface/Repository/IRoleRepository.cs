using LIP.Application.CQRS.Command.Role;
using LIP.Application.CQRS.Query.Role;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface IRoleRepository
{
    Task<Role?> GetAsync(RoleGetQuery query);
    Task<IEnumerable<Role>> GetAllAsync(RoleGetAllQuery query);
    Task<bool> CreateAsync(RoleCreateCommand command);
}