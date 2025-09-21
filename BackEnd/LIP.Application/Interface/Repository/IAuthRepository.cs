using LIP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Repository
{
    public interface IAuthRepository
    {
        public Task<bool> Register(User user);
        public Task<bool> Login(User user);
        //public Task<bool> UpdateRefreshToken(int userId, string refreshToken, DateTime refreshTokenExpiryTime);
        public Task<bool> RevokeRefreshToken(int userId);
        public Task<string?> GetRefreshToken(int userId);
        public Task<string?> Refresh(string token);
    }
}
