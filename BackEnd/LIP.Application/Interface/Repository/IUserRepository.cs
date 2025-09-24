using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository
{
    public interface IUserRepository
    {
        Task<User?> GetAsync(UserGetQuery query);
        Task<IEnumerable<User>> GetAllAsync(UserGetAllQuery query);
        Task<bool> CreateAsync(UserCreateCommand command);

        Task<bool> UpdateAsync(UserUpdateCommand command);
        Task<bool> DeleteAsync(UserDeleteCommand command);
        Task<bool> RegisterAsync(User user);

        //public Task<User?> GetAsync(int id);
        //public Task<IEnumerable<User>?> GetAllAsync(int? roleId, string? email);
        //public Task<bool> CreateAsync(User user);
        //public Task<bool> UpdateAsync(User user);
        //public Task<bool> DeleteAsync(User user);
    }
}