using LIP.Domain.Entities;

namespace LIP.Application.Interface.Helpers;

public interface IJwtHelper
{
    public string GenerateAccessToken(User user);
    public string GenerateRefreshToken();
    public bool IsTokenValid(string token);
    public DateTime ConvertUnixTimeToDateTime(long utcExpiredDate);
    public (bool, string?) ValidateToken(string accessToken);
}