using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Validation;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LIP.Application.CQRS.Command.Payment;

public class CreatePaymentCommand : IRequest<PaymentCreateResponse>, IValidatable<PaymentCreateResponse>
{
    public int UserId { get; set; }
    public int TemplateId { get; set; }
        
    public HttpContext HttpContext { get; set; } = null!;
    public Task<PaymentCreateResponse> ValidateAsync()
    {
        var response = new PaymentCreateResponse();
        if (UserId <= 0)
        {
            response.IsSuccess = false;
            response.Message = "Invalid data";
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "Invalid UserId"
            });
        }
        if (TemplateId <= 0)
        {
            response.IsSuccess = false;
            response.Message = "Invalid data";
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "Invalid UserId"
            });
        }
        return Task.FromResult(response);
    }
}