using System.Text.Json;
using LIP.Application.Interface.Helpers;
using Microsoft.AspNetCore.Http;

namespace LIP.Infrastructure.Implements.Helpers;

public class SessionExtensions : ISessionExtensions
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SessionExtensions(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public T? Get<T>(string key)
    {
        var value = _httpContextAccessor.HttpContext!.Session.GetString(key);
        return value == null ? default : JsonSerializer.Deserialize<T>(value);
    }

    public void Remove(string key)
    {
        _httpContextAccessor.HttpContext!.Session.Remove(key);
    }

    public void Set<T>(string key, T value)
    {
        _httpContextAccessor.HttpContext!.Session.SetString(key, JsonSerializer.Serialize(value));
    }
}