using LIP.Application.CQRS.Command.Payment;
using LIP.Application.DTOs.Response.Payment;
using Microsoft.AspNetCore.Http;

namespace LIP.Application.Interface.Helpers;

public interface IMomoService
{
    Task<string> CreatePaymentURL(OrderInfoModel orderInfo, HttpContext context);
    Task<PaymentCallbackResponseDTO> GetPaymentStatus(IQueryCollection collection);
}