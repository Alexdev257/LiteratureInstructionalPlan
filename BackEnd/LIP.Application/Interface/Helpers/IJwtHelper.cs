using LIP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Helpers
{
    public interface IJwtHelper
    {
        public string GenerateAccessToken(User user);
        public string GenerateRefreshToken();
        public bool IsTokenValid(string token);
        public DateTime ConvertUnixTimeToDateTime(long utcExpiredDate);
        public (bool, string?) ValidateToken(string accessToken);
    }
}
