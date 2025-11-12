namespace LIP.Application.Interface.Helpers;

public interface IRedisHelper
{
    Task<T?> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null);
    Task RemoveAsync(string key);
    Task<bool> ExistAsync(string key);
}