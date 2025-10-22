using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public partial class User
{
    [Key]
    public int UserId
    {
        get; set;
    }

    public string UserName { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? RoleId
    {
        get; set;
    }

    public DateTime? CreatedAt
    {
        get; set;
    }

    public bool IsDeleted
    {
        get; set;
    }

    public DateTime DeletedAt
    {
        get; set;
    }

    public virtual ICollection<ExamAttempt> Examattempts { get; set; } = new List<ExamAttempt>();

    public virtual ICollection<ExamMatrix> Exammatrices { get; set; } = new List<ExamMatrix>();

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<PracticeQuestion> Practicequestions { get; set; } = new List<PracticeQuestion>();

    public virtual Role? Role
    {
        get; set;
    }

    public virtual ICollection<TemplateOrder> Templatebookings { get; set; } = new List<TemplateOrder>();

    public virtual ICollection<Template> Templates { get; set; } = new List<Template>();
}