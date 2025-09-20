using LIP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Infrastructure.Persistency
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public virtual DbSet<Answerguide> Answerguides { get; set; }

        public virtual DbSet<Bookseries> Bookseries { get; set; }

        public virtual DbSet<Exam> Exams { get; set; }

        public virtual DbSet<Examanswer> Examanswers { get; set; }

        public virtual DbSet<Examattempt> Examattempts { get; set; }

        public virtual DbSet<Examtype> Examtypes { get; set; }

        public virtual DbSet<Gradelevel> Gradelevels { get; set; }

        public virtual DbSet<Practicequestion> Practicequestions { get; set; }

        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<Submission> Submissions { get; set; }

        public virtual DbSet<Template> Templates { get; set; }

        public virtual DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Answerguide>(entity =>
            {
                entity.HasKey(e => e.AnswerGuideId).HasName("PRIMARY");

                entity.ToTable("answerguides");

                entity.HasIndex(e => e.ExamId, "ExamId");

                entity.Property(e => e.KeyPoints).HasColumnType("text");

                entity.HasOne(d => d.Exam).WithMany(p => p.Answerguides)
                    .HasForeignKey(d => d.ExamId)
                    .HasConstraintName("answerguides_ibfk_1");
            });

            modelBuilder.Entity<Bookseries>(entity =>
            {
                entity.HasKey(e => e.SeriesId).HasName("PRIMARY");

                entity.ToTable("bookseries");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
            });

            modelBuilder.Entity<Exam>(entity =>
            {
                entity.HasKey(e => e.ExamId).HasName("PRIMARY");

                entity.ToTable("exams");

                entity.HasIndex(e => e.CreatedBy, "CreatedBy");

                entity.HasIndex(e => e.ExamTypeId, "ExamTypeId");

                entity.HasIndex(e => e.GradeLevelId, "GradeLevelId");

                entity.HasIndex(e => e.SeriesId, "SeriesId");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");
                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");

                entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Exams)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("exams_ibfk_4");

                entity.HasOne(d => d.ExamType).WithMany(p => p.Exams)
                    .HasForeignKey(d => d.ExamTypeId)
                    .HasConstraintName("exams_ibfk_3");

                entity.HasOne(d => d.GradeLevel).WithMany(p => p.Exams)
                    .HasForeignKey(d => d.GradeLevelId)
                    .HasConstraintName("exams_ibfk_1");

                entity.HasOne(d => d.Series).WithMany(p => p.Exams)
                    .HasForeignKey(d => d.SeriesId)
                    .HasConstraintName("exams_ibfk_2");

                entity.HasMany(d => d.Questions).WithMany(p => p.Exams)
                    .UsingEntity<Dictionary<string, object>>(
                        "Examquestion",
                        r => r.HasOne<Practicequestion>().WithMany()
                            .HasForeignKey("QuestionId")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("examquestions_ibfk_2"),
                        l => l.HasOne<Exam>().WithMany()
                            .HasForeignKey("ExamId")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("examquestions_ibfk_1"),
                        j =>
                        {
                            j.HasKey("ExamId", "QuestionId")
                                .HasName("PRIMARY")
                                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                            j.ToTable("examquestions");
                            j.HasIndex(new[] { "QuestionId" }, "QuestionId");
                        });
            });

            modelBuilder.Entity<Examanswer>(entity =>
            {
                entity.HasKey(e => e.AnswerId).HasName("PRIMARY");

                entity.ToTable("examanswers");

                entity.HasIndex(e => e.AttemptId, "AttemptId");

                entity.HasIndex(e => e.QuestionId, "QuestionId");

                entity.Property(e => e.AnswerContent).HasColumnType("text");

                entity.HasOne(d => d.Attempt).WithMany(p => p.Examanswers)
                    .HasForeignKey(d => d.AttemptId)
                    .HasConstraintName("examanswers_ibfk_1");

                entity.HasOne(d => d.Question).WithMany(p => p.Examanswers)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("examanswers_ibfk_2");
            });

            modelBuilder.Entity<Examattempt>(entity =>
            {
                entity.HasKey(e => e.AttemptId).HasName("PRIMARY");

                entity.ToTable("examattempts");

                entity.HasIndex(e => e.ExamId, "ExamId");

                entity.HasIndex(e => e.UserId, "UserId");

                entity.Property(e => e.EndTime).HasColumnType("datetime");
                entity.Property(e => e.Feedback).HasColumnType("text");
                entity.Property(e => e.LastSavedAt).HasColumnType("datetime");
                entity.Property(e => e.Score).HasPrecision(5, 2);
                entity.Property(e => e.StartTime).HasColumnType("datetime");
                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.Exam).WithMany(p => p.Examattempts)
                    .HasForeignKey(d => d.ExamId)
                    .HasConstraintName("examattempts_ibfk_1");

                entity.HasOne(d => d.User).WithMany(p => p.Examattempts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("examattempts_ibfk_2");
            });

            modelBuilder.Entity<Examtype>(entity =>
            {
                entity.HasKey(e => e.ExamTypeId).HasName("PRIMARY");

                entity.ToTable("examtypes");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
            });

            modelBuilder.Entity<Gradelevel>(entity =>
            {
                entity.HasKey(e => e.GradeLevelId).HasName("PRIMARY");

                entity.ToTable("gradelevels");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
            });

            modelBuilder.Entity<Practicequestion>(entity =>
            {
                entity.HasKey(e => e.QuestionId).HasName("PRIMARY");

                entity.ToTable("practicequestions");

                entity.HasIndex(e => e.CreatedBy, "CreatedBy");

                entity.HasIndex(e => e.GradeLevelId, "GradeLevelId");

                entity.HasIndex(e => e.SeriesId, "SeriesId");

                entity.Property(e => e.Answer).HasColumnType("text");
                entity.Property(e => e.Content).HasColumnType("text");
                entity.Property(e => e.CreatedAt).HasColumnType("datetime");
                entity.Property(e => e.QuestionType).HasMaxLength(50);

                entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Practicequestions)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("practicequestions_ibfk_3");

                entity.HasOne(d => d.GradeLevel).WithMany(p => p.Practicequestions)
                    .HasForeignKey(d => d.GradeLevelId)
                    .HasConstraintName("practicequestions_ibfk_1");

                entity.HasOne(d => d.Series).WithMany(p => p.Practicequestions)
                    .HasForeignKey(d => d.SeriesId)
                    .HasConstraintName("practicequestions_ibfk_2");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.RoleId).HasName("PRIMARY");

                entity.ToTable("roles");

                entity.HasIndex(e => e.RoleName, "RoleName").IsUnique();

                entity.Property(e => e.RoleName).HasMaxLength(50);
            });

            modelBuilder.Entity<Submission>(entity =>
            {
                entity.HasKey(e => e.SubmissionId).HasName("PRIMARY");

                entity.ToTable("submissions");

                entity.HasIndex(e => e.ExamId, "ExamId");

                entity.HasIndex(e => e.StudentId, "StudentId");

                entity.Property(e => e.AiFeedback).HasColumnType("text");
                entity.Property(e => e.Content).HasColumnType("text");
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.SubmitTime).HasColumnType("datetime");

                entity.HasOne(d => d.Exam).WithMany(p => p.Submissions)
                    .HasForeignKey(d => d.ExamId)
                    .HasConstraintName("submissions_ibfk_1");

                entity.HasOne(d => d.Student).WithMany(p => p.Submissions)
                    .HasForeignKey(d => d.StudentId)
                    .HasConstraintName("submissions_ibfk_2");
            });

            modelBuilder.Entity<Template>(entity =>
            {
                entity.HasKey(e => e.TemplateId).HasName("PRIMARY");

                entity.ToTable("templates");

                entity.HasIndex(e => e.CreatedBy, "CreatedBy");

                entity.HasIndex(e => e.GradeLevelId, "GradeLevelId");

                entity.HasIndex(e => e.SeriesId, "SeriesId");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");
                entity.Property(e => e.FilePath)
                    .HasMaxLength(500)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");

                entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Templates)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("templates_ibfk_3");

                entity.HasOne(d => d.GradeLevel).WithMany(p => p.Templates)
                    .HasForeignKey(d => d.GradeLevelId)
                    .HasConstraintName("templates_ibfk_1");

                entity.HasOne(d => d.Series).WithMany(p => p.Templates)
                    .HasForeignKey(d => d.SeriesId)
                    .HasConstraintName("templates_ibfk_2");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PRIMARY");

                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "Email").IsUnique();

                entity.HasIndex(e => e.RoleId, "RoleId");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");
                entity.Property(e => e.Email)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
                entity.Property(e => e.FullName)
                    .HasMaxLength(255)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .UseCollation("utf8mb3_general_ci")
                    .HasCharSet("utf8mb3");

                entity.HasOne(d => d.Role).WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("users_ibfk_1");


            });

            //modelBuilder.Entity<User>()
            //    .HasData(new User()
            //    {
            //        UserId = 1,
            //        UserName = "admin",
            //        FullName = "Admin User",
            //        Email = "",
            //    });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
