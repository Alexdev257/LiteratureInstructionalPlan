using System;

namespace LIP.Application.Interface.Validation;

public interface IValidatable
{
    Task<bool> ValidateAsync();
}
