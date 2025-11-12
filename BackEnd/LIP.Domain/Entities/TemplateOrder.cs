using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

// cho mua thoi
public class TemplateOrder
{
    [Key] public int BookingId { get; set; }

    public int? TemplateId { get; set; }

    public int? UserId { get; set; }

    public DateTime? BookingDate { get; set; }

    public string? Status { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual Template? Template { get; set; }

    public virtual User? User { get; set; }
}