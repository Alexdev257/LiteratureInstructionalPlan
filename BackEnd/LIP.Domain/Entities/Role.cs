using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public class Role
{
    [Key] public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}