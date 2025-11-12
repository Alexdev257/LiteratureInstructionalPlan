using LIP.Application.CQRS.Query.Payment;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Payment;

public class GetPaymentByIdQueryHandler : IRequestHandler<GetPaymentByIdQuery, CommonResponse<PaymentGetResponseDTO>>
{
    private readonly IPaymentRepository _paymentRepository;

    public GetPaymentByIdQueryHandler(IPaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
    }

    public Task<CommonResponse<PaymentGetResponseDTO>> Handle(GetPaymentByIdQuery request,
        CancellationToken cancellationToken)
    {
        var response = new CommonResponse<PaymentGetResponseDTO>();
        var payment = _paymentRepository.GetPaymentIdAsync(request.PaymentId).Result;

        if (payment == null)
        {
            response.IsSuccess = false;
            response.Message = "Payment not found.";
            return Task.FromResult(response);
        }

        response.Data = new PaymentGetResponseDTO
        {
            PaymentId = payment.PaymentId,
            Amount = (decimal)payment.Amount!,
            Status = payment.Status!,
            CreatedAt = (DateTime)payment.PaymentDate!
        };

        response.IsSuccess = true;
        response.Message = "Payment retrieved successfully.";

        return Task.FromResult(response);
    }
}