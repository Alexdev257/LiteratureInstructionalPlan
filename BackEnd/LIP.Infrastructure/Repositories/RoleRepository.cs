using LIP.Application.CQRS.Command.Role;
using LIP.Application.CQRS.Query.Role;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Role?> GetAsync(RoleGetQuery query)
        {
            return await _context.Roles
                .Include(r => r.Users)
                .FirstOrDefaultAsync(r => r.RoleId == query.RoleId);
        }

        public async Task<IEnumerable<Role>> GetAllAsync(RoleGetAllQuery query)
        {
            var roles = _context.Roles.AsQueryable();

            return await roles.ToListAsync();
        }

        public async Task<bool> CreateAsync(RoleCreateCommand command)
        {
            var role = new Role
            {
                RoleName = command.RoleName
            };

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}