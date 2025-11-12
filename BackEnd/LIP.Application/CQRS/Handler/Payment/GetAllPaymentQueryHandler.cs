using LIP.Application.CQRS.Query.Payment;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Payment;

public class GetAllPaymentQueryHandler : IRequestHandler<GetAllPaymentQuery, PaymentGetAllResponse>
{
    private readonly IPaymentRepository _paymentRepository;

    public GetAllPaymentQueryHandler(IPaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
    }

    public Task<PaymentGetAllResponse> Handle(GetAllPaymentQuery request, CancellationToken cancellationToken)
    {
        var response = new PaymentGetAllResponse();
        var payments = _paymentRepository.GetAllPayment().Result;

        response.Data = payments.Select(p => new PaymentGetResponseDTO
        {
            PaymentId = p.PaymentId,
            Amount = (decimal)p.Amount!,
            Status = p.Status!,
            CreatedAt = (DateTime)p.PaymentDate!
        }).ToList();

        response.IsSuccess = true;
        response.Message = "Payments retrieved successfully.";

        return Task.FromResult(response);
    }
}