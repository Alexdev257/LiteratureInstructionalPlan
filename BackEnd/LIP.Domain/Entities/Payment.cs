using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public class Payment
{
    [Key] public int PaymentId { get; set; }

    public int? UserId { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? Status { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public int TemplateOrderId { get; set; }

    public virtual TemplateOrder? TemplateOrder { get; set; }

    public virtual ICollection<TemplateOrder> Templatebookings { get; set; } = new List<TemplateOrder>();

    public virtual User? User { get; set; }
}