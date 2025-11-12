namespace LIP.Application.DTOs.Response;

public class CommonResponse<T> : CommonResponseBase
{
    public T? Data { get; set; }

    public List<Errors> ListErrors { get; set; } = new();
}

public class CommonResponseBase
{
    public bool IsSuccess { get; set; } = true;

    public string Message { get; set; } = string.Empty;
}

public class Errors
{
    public string Field { get; set; } = string.Empty;

    public string Detail { get; set; } = string.Empty;
}