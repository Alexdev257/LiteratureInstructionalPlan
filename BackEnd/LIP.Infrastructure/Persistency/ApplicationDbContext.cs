using LIP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Persistency;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<ExamAnswer> ExamAnswers { get; set; }

    public virtual DbSet<ExamAttempt> ExamAttempts { get; set; }

    public virtual DbSet<ExamMatrix> ExamMatrices { get; set; }

    public virtual DbSet<ExamType> ExamTypes { get; set; }

    public virtual DbSet<GradeLevel> GradeLevels { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PracticeQuestion> PracticeQuestions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Template> Templates { get; set; }

    public virtual DbSet<TemplateOrder> TemplateOrders { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<ExamMatrixDetail> ExamMatrixDetails { get; set; }
}