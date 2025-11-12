using LIP.Application.DTOs.Response.Payment;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LIP.Application.CQRS.Command.Payment;

public class CallbackPaymentCommand : IRequest<PaymentCallbackResponse>
{
    public IQueryCollection collection { get; set; } = null!;
}