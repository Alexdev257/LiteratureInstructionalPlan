using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Payment;

public class GetPaymentsByUserId : IRequest<PaymentGetAllResponse>, IValidatable<PaymentGetAllResponse>
{
    public int UserId { get; set; }

    public Task<PaymentGetAllResponse> ValidateAsync()
    {
        var response = new PaymentGetAllResponse();

        if (UserId <= 0)
        {
            response.IsSuccess = false;
            response.Message = "Invalid UserId. It must be a positive integer.";
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "Invalid PaymentId. It must be a positive integer."
            });
        }

        return Task.FromResult(response);
    }
}