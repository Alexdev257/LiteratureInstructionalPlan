using System;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using Microsoft.Extensions.Logging;

namespace LIP.Application.CQRS.Pipeline;

public class CustomValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
where TResponse : CommonReponseBase
where TRequest : IRequest<TResponse>
{
    private readonly ILogger<CustomValidationBehavior<TRequest, TResponse>> _logger;

    public CustomValidationBehavior(ILogger<CustomValidationBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (request is IValidatable<TResponse> validatable)
        {
            _logger.LogInformation("Running custom validation for {RequestName}", typeof(TRequest).Name);
            var result = await validatable.ValidateAsync();
            if (result.IsSuccess == false)
            {
                _logger.LogWarning("{RequestName} failed custom validation", typeof(TRequest).Name);
                return result;
            }
        }

        return await next();
    }
}

