namespace LIP.Application.DTOs.Response.Payment;

public class PaymentCallbackResponseDTO
{
    public int PaymentId { get; set; }
    public int TemplateOrderId { get; set; }
    public decimal Amount { get; set; }
    public string Message { get; set; } = string.Empty;
}