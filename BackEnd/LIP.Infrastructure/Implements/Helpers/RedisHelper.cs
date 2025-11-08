using System.Text.Json;
using LIP.Application.Interface.Helpers;
using StackExchange.Redis;

namespace LIP.Infrastructure.Implements.Helpers;

public class RedisHelper : IRedisHelper
{
    private readonly IDatabase _database;

    public RedisHelper(IConnectionMultiplexer connectionMultiplexer)
    {
        _database = connectionMultiplexer.GetDatabase();
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var value = await _database.StringGetAsync(key);
        if (value.IsNullOrEmpty) return default;

        return JsonSerializer.Deserialize<T>(value!);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var json = JsonSerializer.Serialize(value);
        await _database.StringSetAsync(key, json, expiration);
    }

    public async Task RemoveAsync(string key)
    {
        await _database.KeyDeleteAsync(key);
    }

    public async Task<bool> ExistAsync(string key)
    {
        return await _database.KeyExistsAsync(key);
    }
}