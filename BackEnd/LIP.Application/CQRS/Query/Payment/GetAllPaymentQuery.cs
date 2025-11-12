using LIP.Application.DTOs.Response.Payment;
using MediatR;

namespace LIP.Application.CQRS.Query.Payment;

public class GetAllPaymentQuery : IRequest<PaymentGetAllResponse>
{
}