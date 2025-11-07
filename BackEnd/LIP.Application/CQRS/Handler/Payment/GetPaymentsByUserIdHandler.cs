using LIP.Application.CQRS.Query.Payment;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Payment;

public class GetPaymentsByUserIdHandler : IRequestHandler<GetPaymentsByUserId, PaymentGetAllResponse>
{
    private readonly IPaymentRepository _paymentRepository;

    public GetPaymentsByUserIdHandler(IPaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
    }

    public async Task<PaymentGetAllResponse> Handle(GetPaymentsByUserId request, CancellationToken cancellationToken)
    {
        var response = new PaymentGetAllResponse();
        var payments = await _paymentRepository.GetPaymentByUserIdAsync(request.UserId);

        response.Data = payments.Select(p => new PaymentGetResponseDTO
        {
            PaymentId = p.PaymentId,
            Amount = (decimal)p.Amount!,
            Status = p.Status!,
            CreatedAt = (DateTime)p.PaymentDate!
        }).ToList();

        response.IsSuccess = true;
        response.Message = "Payments retrieved successfully.";

        return response;
    }
}