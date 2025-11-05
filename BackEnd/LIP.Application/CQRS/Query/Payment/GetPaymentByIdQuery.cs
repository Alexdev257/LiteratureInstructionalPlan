using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Payment;

public class GetPaymentByIdQuery : IRequest<CommonResponse<PaymentGetResponseDTO>>, IValidatable<CommonResponse<PaymentGetResponseDTO>>
{
    public int PaymentId { get; set; }
    public Task<CommonResponse<PaymentGetResponseDTO>> ValidateAsync()
    {
        var response = new CommonResponse<PaymentGetResponseDTO>();

        if (PaymentId <= 0)
        {
            response.IsSuccess = false;
            response.Message = "Invalid PaymentId. It must be a positive integer.";
            response.ListErrors.Add(new Errors
            {
                Field = "PaymentId",
                Detail = "Invalid PaymentId. It must be a positive integer."
            });
        }

        return Task.FromResult(response);
    }
}