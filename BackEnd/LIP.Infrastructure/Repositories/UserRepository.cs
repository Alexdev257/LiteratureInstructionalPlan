using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<User?> GetAsync(UserGetQuery query)
        {
            return await _context.Users
                .AsNoTracking()
                .Include(u => u.Role)
                .Include(u => u.Examattempts)
                .Include(u => u.Exams)
                .Include(u => u.Practicequestions)
                .Include(u => u.Templates)
                .Where(u => !u.IsDeleted)
                .FirstOrDefaultAsync(u => u.UserId == query.UserId);
        }

        public async Task<IEnumerable<User>> GetAllAsync(UserGetAllQuery query)
        {
            var users = _context.Users
                .AsNoTracking()
                .Include(u => u.Role)
                .Where(u => !u.IsDeleted)
                .AsQueryable();

            if (query.RoleId.HasValue)
                users = users.Where(u => u.RoleId == query.RoleId);

            if (!string.IsNullOrEmpty(query.Email))
                users = users.Where(u => u.Email == query.Email);

            return await users.ToListAsync();
        }

        public async Task<bool> CreateAsync(UserCreateCommand command)
        {
            var user = new User
            {
                UserName = command.UserName,
                FullName = command.FullName,
                Email = command.Email,
                Password = command.Password,
                RoleId = command.RoleId,
                CreatedAt = command.CreatedAt
            };

            _context.Users.Add(user);
            return await _context.SaveChangesAsync() > 0;

        }

        public async Task<bool> UpdateAsync(UserUpdateCommand command)
        {
            var user = await _context.Users.FindAsync(command.UserId);
            if (user == null || user.IsDeleted) return false;

            user.UserName = command.UserName;
            user.FullName = command.FullName;
            user.Email = command.Email;
            user.Password = command.Password;
            user.RoleId = command.RoleId;
            user.CreatedAt = command.CreatedAt;

            return await _context.SaveChangesAsync() > 0;

        }

        public async Task<bool> DeleteAsync(UserDeleteCommand command)
        {
            var user = await _context.Users.FindAsync(command.UserId);
            if (user == null) return false;

            user.IsDeleted = true;
            user.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RegisterAsync(User user)
        {
            _context.Users.Add(user);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}