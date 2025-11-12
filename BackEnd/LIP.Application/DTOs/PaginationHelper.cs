using LIP.Application.DTOs.Response;

namespace LIP.Application.DTOs;

public static class PaginationHelper
{
    public static PaginationResponse<T> ToPagedListAsync<T>(
        this IEnumerable<T> query,
        int pageNumber,
        int pageSize
    )
    {
        var totalItems = query.Count();
        var items = query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return new PaginationResponse<T>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }
}