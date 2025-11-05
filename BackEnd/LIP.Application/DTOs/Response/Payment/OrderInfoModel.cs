namespace LIP.Application.DTOs.Response.Payment;

public class OrderInfoModel
{
    public int OrderId { get; set; } 
    // This is OrderTemplateId
    public int TemplateOrderId { get; set; } 
    public decimal Amount { get; set; } = 0;
}