namespace LIP.Application.Interface.Validation;

public interface IValidatable<T>
{
    Task<T> ValidateAsync();
}