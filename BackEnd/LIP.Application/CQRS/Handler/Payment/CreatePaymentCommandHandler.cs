using LIP.Application.CQRS.Command.Payment;
using LIP.Application.CQRS.Command.Templatebooking;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.Payment;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using LIP.Domain.Enum;
using MediatR;

namespace LIP.Application.CQRS.Handler.Payment;

public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand, PaymentCreateResponse>
{
    private readonly IMomoService _momoService;
    private readonly IPaymentRepository _paymentRepository;
    private readonly ITemplatebookingRepository _templatebookingRepository;
    private readonly ITemplateRepository _templateRepository;
    private readonly IUserRepository _userRepository;

    public CreatePaymentCommandHandler(IMomoService momoService, IPaymentRepository paymentRepository,
        ITemplatebookingRepository templatebookingRepository, ITemplateRepository templateRepository,
        IUserRepository userRepository)
    {
        _momoService = momoService;
        _paymentRepository = paymentRepository;
        _templatebookingRepository = templatebookingRepository;
        _templateRepository = templateRepository;
        _userRepository = userRepository;
    }

    public async Task<PaymentCreateResponse> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
    {
        var template = await _templateRepository.GetAsync(new TemplateGetQuery { TemplateId = request.TemplateId });
        var user = await _userRepository.GetAsync(new UserGetQuery { UserId = request.UserId });

        if (template == null || user == null)
            return new PaymentCreateResponse
            {
                IsSuccess = false,
                Message = "Template or User not found"
            };

        // Add templateOrder to database with status "Pending"
        var resultTemplateBooking = await _templatebookingRepository.CreateAsync(new TemplatebookingCreateCommand
        {
            TemplateId = request.TemplateId,
            UserId = request.UserId
        });
        var resultPayment = await _paymentRepository.CreatePayment(new Domain.Entities.Payment
        {
            UserId = request.UserId,
            Amount = (decimal?)template.Price,
            PaymentDate = DateTime.Now,
            TemplateOrder = resultTemplateBooking,
            PaymentMethod = "Momo",
            Status = nameof(PaymentEnum.Pending)
        });
        var paymentUrl = await _momoService.CreatePaymentURL(new OrderInfoModel
        {
            Amount = (decimal)template.Price,
            PaymentId = resultPayment.PaymentId,
            TemplateOrderId = resultTemplateBooking.BookingId,
            OrderId = DateTime.Now.Ticks.ToString()
        }, request.HttpContext);

        var response = new PaymentCreateResponse
        {
            IsSuccess = true,
            Message = "Payment URL created successfully",
            Data = new PaymentCreateResponseDTO
            {
                CheckoutUrl = paymentUrl,
                PaymentId = resultPayment.PaymentId
            }
        };
        return response;
    }
}