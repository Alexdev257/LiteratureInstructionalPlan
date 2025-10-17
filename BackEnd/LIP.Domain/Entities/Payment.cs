using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? UserId { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? Status { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual ICollection<Templatebooking> Templatebookings { get; set; } = new List<Templatebooking>();

    public virtual User? User { get; set; }
}
