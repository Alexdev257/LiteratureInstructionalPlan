namespace LIP.Application.DTOs.Response.Payment;

public class PaymentGetResponseDTO
{
    public int PaymentId { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}