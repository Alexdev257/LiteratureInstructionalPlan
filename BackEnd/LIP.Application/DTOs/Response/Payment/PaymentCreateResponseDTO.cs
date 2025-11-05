namespace LIP.Application.DTOs.Response.Payment;

public class PaymentCreateResponseDTO
{
    public int PaymentId { get; set; }
    public string CheckoutUrl { get; set; } = string.Empty;
}