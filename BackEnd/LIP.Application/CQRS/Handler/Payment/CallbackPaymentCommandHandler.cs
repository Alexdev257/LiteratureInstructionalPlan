using LIP.Application.CQRS.Command.Payment;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using LIP.Domain.Enum;
using MediatR;

namespace LIP.Application.CQRS.Handler.Payment;

public class CallbackPaymentCommandHandler : IRequestHandler<CallbackPaymentCommand, PaymentCallbackResponse>
{
    private readonly ITemplatebookingRepository _templatebookingRepository;
    private readonly IPaymentRepository _paymentRepository;
    private readonly IMomoService _momoService;

    public CallbackPaymentCommandHandler(ITemplatebookingRepository templatebookingRepository, IPaymentRepository paymentRepository, IMomoService momoService)
    {
        _templatebookingRepository = templatebookingRepository;
        _paymentRepository = paymentRepository;
        _momoService = momoService;
    }

    public async Task<PaymentCallbackResponse> Handle(CallbackPaymentCommand request, CancellationToken cancellationToken)
    {
        var resultPayment = await _momoService.GetPaymentStatus(request.collection);
        
        if (resultPayment.Message.Equals(nameof(Domain.Enum.PaymentEnum.Success)))
        {
            var templateBooking = await _templatebookingRepository.GetAsync(new TemplatebookingGetQuery
            {
                TemplatebookingId = resultPayment.TemplateOrderId
            });
            templateBooking!.Status = nameof(TemplateBookingEnum.Success);
            var updatedTemplateBooking = await _templatebookingRepository.UpdateAsync(templateBooking);

            var payment = await _paymentRepository.GetPaymentIdAsync(resultPayment.PaymentId);
            payment!.Status = nameof(PaymentEnum.Success);
            var updatedPayment =  await _paymentRepository.UpdatePayment(payment);
            
            return new PaymentCallbackResponse
            {
                IsSuccess = true,
                Message = "Payment successful"
            };
        }
        else
        {
            var templateBooking = await _templatebookingRepository.GetAsync(new TemplatebookingGetQuery
            {
                TemplatebookingId = resultPayment.TemplateOrderId
            });
            templateBooking!.Status = nameof(TemplateBookingEnum.Failed);
            var updatedTemplateBooking = await _templatebookingRepository.UpdateAsync(templateBooking);

            var payment = await _paymentRepository.GetPaymentIdAsync(resultPayment.PaymentId);
            payment!.Status = nameof(PaymentEnum.Failed);
            var updatedPayment =  await _paymentRepository.UpdatePayment(payment);
            
            return new PaymentCallbackResponse
            {
                IsSuccess = false,
                Message = "Payment failed"
            };
        }
    }
}