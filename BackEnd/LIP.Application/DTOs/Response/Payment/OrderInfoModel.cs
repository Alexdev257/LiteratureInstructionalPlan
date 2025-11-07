namespace LIP.Application.DTOs.Response.Payment;

public class OrderInfoModel
{
    public int PaymentId { get; set; } 
    
    public string OrderId { get; set; } = string.Empty;
    
    // This is OrderTemplateId
    public int TemplateOrderId { get; set; } 
    public decimal Amount { get; set; } = 0;
}