using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Template;

public class TemplateGetByUserId : IRequest<TemplateGetResponse>, IValidatable<TemplateGetResponse>
{
    public int UserId { get; set; }

    public Task<TemplateGetResponse> ValidateAsync()
    {
        var response = new TemplateGetResponse();
        if (UserId <= 0)
        {
            response.IsSuccess = false;
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId must be greater than zero."
            });
        }

        return Task.FromResult(response);
    }
}