using LIP.Application.CQRS.Command.Payment;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IMediator _mediator;

    public PaymentController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    public class CreatePaymentRequest
    {
        public int UserId { get; set; }
        public int TemplateId { get; set; }
    }
    
    [HttpPost("payment")]
    public async Task<IActionResult> ProcessPayment([FromBody] CreatePaymentRequest command)
    {
        var result = await _mediator.Send(new CreatePaymentCommand
        {
            UserId = command.UserId,
            TemplateId = command.TemplateId,
            HttpContext = HttpContext
        });
        
        return StatusCode(result.IsSuccess ? 201 : 500, result);
    }

    [HttpPost("callback")]
    public async Task<IActionResult> PaymentCallback()
    {
        var result = await _mediator.Send(new CallbackPaymentCommand
        {
            collection = Request.Query
        });
        
        return StatusCode(result.IsSuccess ? 201 : 500, result);
    }
}