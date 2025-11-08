using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public class GradeLevel
{
    [Key] public int GradeLevelId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<ExamMatrix> Exammatrices { get; set; } = new List<ExamMatrix>();

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<PracticeQuestion> Practicequestions { get; set; } = new List<PracticeQuestion>();

    public virtual ICollection<Template> Templates { get; set; } = new List<Template>();
}