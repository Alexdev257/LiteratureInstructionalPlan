using LIP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Persistency;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext( DbContextOptions<ApplicationDbContext> options )
        : base( options )
    {
    }

    public virtual DbSet<Answerguide> Answerguides
    {
        get; set;
    }

    public virtual DbSet<Exam> Exams
    {
        get; set;
    }

    public virtual DbSet<Examanswer> Examanswers
    {
        get; set;
    }

    public virtual DbSet<Examattempt> Examattempts
    {
        get; set;
    }

    public virtual DbSet<Exammatrix> Exammatrices
    {
        get; set;
    }

    public virtual DbSet<Examtype> Examtypes
    {
        get; set;
    }

    public virtual DbSet<Gradelevel> Gradelevels
    {
        get; set;
    }

    public virtual DbSet<Payment> Payments
    {
        get; set;
    }

    public virtual DbSet<Practicequestion> Practicequestions
    {
        get; set;
    }

    public virtual DbSet<Role> Roles
    {
        get; set;
    }

    public virtual DbSet<Template> Templates
    {
        get; set;
    }

    public virtual DbSet<Templatebooking> Templatebookings
    {
        get; set;
    }

    public virtual DbSet<User> Users
    {
        get; set;
    }

    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    //        => optionsBuilder.UseMySql("server=localhost;database=swd392;user=root;password=12345", ServerVersion.Parse("8.0.43-mysql"));

    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
        modelBuilder
            .UseCollation( "utf8mb4_0900_ai_ci" )
            .HasCharSet( "utf8mb4" );

        modelBuilder.Entity<Answerguide>( entity =>
        {
            entity.HasKey( e => e.AnswerGuideId ).HasName( "PRIMARY" );

            entity.ToTable( "answerguides" );

            entity.HasIndex( e => e.ExamId, "ExamId" );

            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.KeyPoints ).HasColumnType( "text" );

            entity.HasOne( d => d.Exam ).WithMany( p => p.Answerguides )
                .HasForeignKey( d => d.ExamId )
                .HasConstraintName( "answerguides_ibfk_1" );
        } );

        modelBuilder.Entity<Exam>( entity =>
        {
            entity.HasKey( e => e.ExamId ).HasName( "PRIMARY" );

            entity.ToTable( "exams" );

            entity.HasIndex( e => e.CreatedBy, "CreatedBy" );

            entity.HasIndex( e => e.ExamTypeId, "ExamTypeId" );

            entity.HasIndex( e => e.GradeLevelId, "GradeLevelId" );

            entity.HasIndex( e => e.MatrixId, "MatrixId" );

            entity.Property( e => e.CreatedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Description )
                .HasMaxLength( 500 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.Title )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );

            entity.HasOne( d => d.CreatedByNavigation ).WithMany( p => p.Exams )
                .HasForeignKey( d => d.CreatedBy )
                .HasConstraintName( "exams_ibfk_4" );

            entity.HasOne( d => d.ExamType ).WithMany( p => p.Exams )
                .HasForeignKey( d => d.ExamTypeId )
                .HasConstraintName( "exams_ibfk_2" );

            entity.HasOne( d => d.GradeLevel ).WithMany( p => p.Exams )
                .HasForeignKey( d => d.GradeLevelId )
                .HasConstraintName( "exams_ibfk_1" );

            entity.HasOne( d => d.Matrix ).WithMany( p => p.Exams )
                .HasForeignKey( d => d.MatrixId )
                .HasConstraintName( "exams_ibfk_3" );

            entity.HasMany( d => d.Questions ).WithMany( p => p.Exams )
                .UsingEntity<Dictionary<string, object>>(
                    "Examquestion",
                    r => r.HasOne<Practicequestion>().WithMany()
                        .HasForeignKey( "QuestionId" )
                        .OnDelete( DeleteBehavior.ClientSetNull )
                        .HasConstraintName( "examquestions_ibfk_2" ),
                    l => l.HasOne<Exam>().WithMany()
                        .HasForeignKey( "ExamId" )
                        .OnDelete( DeleteBehavior.ClientSetNull )
                        .HasConstraintName( "examquestions_ibfk_1" ),
                    j =>
                    {
                        j.HasKey( "ExamId", "QuestionId" )
                            .HasName( "PRIMARY" )
                            .HasAnnotation( "MySql:IndexPrefixLength", new[] { 0, 0 } );
                        j.ToTable( "examquestions" );
                        j.HasIndex( new[] { "QuestionId" }, "QuestionId" );
                    } );
        } );

        modelBuilder.Entity<Examanswer>( entity =>
        {
            entity.HasKey( e => e.AnswerId ).HasName( "PRIMARY" );

            entity.ToTable( "examanswers" );

            entity.HasIndex( e => e.AttemptId, "AttemptId" );

            entity.HasIndex( e => e.QuestionId, "QuestionId" );

            entity.Property( e => e.AnswerContent ).HasColumnType( "text" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );

            entity.HasOne( d => d.Attempt ).WithMany( p => p.Examanswers )
                .HasForeignKey( d => d.AttemptId )
                .HasConstraintName( "examanswers_ibfk_1" );

            entity.HasOne( d => d.Question ).WithMany( p => p.Examanswers )
                .HasForeignKey( d => d.QuestionId )
                .HasConstraintName( "examanswers_ibfk_2" );
        } );

        modelBuilder.Entity<Examattempt>( entity =>
        {
            entity.HasKey( e => e.AttemptId ).HasName( "PRIMARY" );

            entity.ToTable( "examattempts" );

            entity.HasIndex( e => e.ExamId, "ExamId" );

            entity.HasIndex( e => e.UserId, "UserId" );

            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.EndTime ).HasColumnType( "datetime" );
            entity.Property( e => e.Feedback ).HasColumnType( "text" );
            entity.Property( e => e.LastSavedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Score ).HasPrecision( 5, 2 );
            entity.Property( e => e.StartTime ).HasColumnType( "datetime" );
            entity.Property( e => e.Status ).HasMaxLength( 50 );

            entity.HasOne( d => d.Exam ).WithMany( p => p.Examattempts )
                .HasForeignKey( d => d.ExamId )
                .HasConstraintName( "examattempts_ibfk_1" );

            entity.HasOne( d => d.User ).WithMany( p => p.Examattempts )
                .HasForeignKey( d => d.UserId )
                .HasConstraintName( "examattempts_ibfk_2" );
        } );

        modelBuilder.Entity<Exammatrix>( entity =>
        {
            entity.HasKey( e => e.MatrixId ).HasName( "PRIMARY" );

            entity.ToTable( "exammatrices" );

            entity.HasIndex( e => e.CreatedBy, "CreatedBy" );

            entity.HasIndex( e => e.GradeLevelId, "GradeLevelId" );

            entity.Property( e => e.CreatedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Description ).HasColumnType( "text" );
            entity.Property( e => e.Difficulty ).HasMaxLength( 50 );
            entity.Property( e => e.LessonName )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.Notes )
                .HasMaxLength( 500 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.QuestionType ).HasMaxLength( 50 );
            entity.Property( e => e.ScorePerQuestion ).HasPrecision( 5, 2 );
            entity.Property( e => e.Status ).HasMaxLength( 50 );
            entity.Property( e => e.Title )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );

            entity.HasOne( d => d.CreatedByNavigation ).WithMany( p => p.Exammatrices )
                .HasForeignKey( d => d.CreatedBy )
                .HasConstraintName( "exammatrices_ibfk_2" );

            entity.HasOne( d => d.GradeLevel ).WithMany( p => p.Exammatrices )
                .HasForeignKey( d => d.GradeLevelId )
                .HasConstraintName( "exammatrices_ibfk_1" );
        } );

        modelBuilder.Entity<Examtype>( entity =>
        {
            entity.HasKey( e => e.ExamTypeId ).HasName( "PRIMARY" );

            entity.ToTable( "examtypes" );

            entity.Property( e => e.Name )
                .HasMaxLength( 100 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
        } );

        modelBuilder.Entity<Gradelevel>( entity =>
        {
            entity.HasKey( e => e.GradeLevelId ).HasName( "PRIMARY" );

            entity.ToTable( "gradelevels" );

            entity.Property( e => e.Name )
                .HasMaxLength( 50 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
        } );

        modelBuilder.Entity<Payment>( entity =>
        {
            entity.HasKey( e => e.PaymentId ).HasName( "PRIMARY" );

            entity.ToTable( "payments" );

            entity.HasIndex( e => e.UserId, "UserId" );

            entity.Property( e => e.Amount ).HasPrecision( 10, 2 );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.PaymentDate ).HasColumnType( "datetime" );
            entity.Property( e => e.PaymentMethod ).HasMaxLength( 50 );
            entity.Property( e => e.Status ).HasMaxLength( 50 );

            entity.HasOne( d => d.User ).WithMany( p => p.Payments )
                .HasForeignKey( d => d.UserId )
                .HasConstraintName( "payments_ibfk_1" );
        } );

        modelBuilder.Entity<Practicequestion>( entity =>
        {
            entity.HasKey( e => e.QuestionId ).HasName( "PRIMARY" );

            entity.ToTable( "practicequestions" );

            entity.HasIndex( e => e.CreatedBy, "CreatedBy" );

            entity.HasIndex( e => e.GradeLevelId, "GradeLevelId" );

            entity.Property( e => e.Answer ).HasColumnType( "text" );
            entity.Property( e => e.Content ).HasColumnType( "text" );
            entity.Property( e => e.CreatedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Difficulty ).HasMaxLength( 50 );
            entity.Property( e => e.QuestionType ).HasMaxLength( 50 );

            entity.HasOne( d => d.CreatedByNavigation ).WithMany( p => p.Practicequestions )
                .HasForeignKey( d => d.CreatedBy )
                .HasConstraintName( "practicequestions_ibfk_2" );

            entity.HasOne( d => d.GradeLevel ).WithMany( p => p.Practicequestions )
                .HasForeignKey( d => d.GradeLevelId )
                .HasConstraintName( "practicequestions_ibfk_1" );
        } );

        modelBuilder.Entity<Role>( entity =>
        {
            entity.HasKey( e => e.RoleId ).HasName( "PRIMARY" );

            entity.ToTable( "roles" );

            entity.HasIndex( e => e.RoleName, "RoleName" ).IsUnique();

            entity.Property( e => e.RoleName ).HasMaxLength( 50 );
        } );

        modelBuilder.Entity<Submission>( entity =>
        {
            entity.HasKey( e => e.SubmissionId ).HasName( "PRIMARY" );

            entity.ToTable( "submissions" );

            entity.HasIndex( e => e.ExamId, "ExamId" );

            entity.HasIndex( e => e.StudentId, "StudentId" );

            entity.Property( e => e.AiFeedback ).HasColumnType( "text" );
            entity.Property( e => e.Content ).HasColumnType( "text" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Status ).HasMaxLength( 50 );
            entity.Property( e => e.SubmitTime ).HasColumnType( "datetime" );

            entity.HasOne( d => d.Exam ).WithMany( p => p.Submissions )
                .HasForeignKey( d => d.ExamId )
                .HasConstraintName( "submissions_ibfk_1" );

            entity.HasOne( d => d.Student ).WithMany( p => p.Submissions )
                .HasForeignKey( d => d.StudentId )
                .HasConstraintName( "submissions_ibfk_2" );
        } );

        modelBuilder.Entity<Template>( entity =>
        {
            entity.HasKey( e => e.TemplateId ).HasName( "PRIMARY" );

            entity.ToTable( "templates" );

            entity.HasIndex( e => e.CreatedBy, "CreatedBy" );

            entity.HasIndex( e => e.GradeLevelId, "GradeLevelId" );

            entity.Property( e => e.CreatedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.FilePath )
                .HasMaxLength( 500 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.Title )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );

            entity.HasOne( d => d.CreatedByNavigation ).WithMany( p => p.Templates )
                .HasForeignKey( d => d.CreatedBy )
                .HasConstraintName( "templates_ibfk_2" );

            entity.HasOne( d => d.GradeLevel ).WithMany( p => p.Templates )
                .HasForeignKey( d => d.GradeLevelId )
                .HasConstraintName( "templates_ibfk_1" );
        } );

        modelBuilder.Entity<Templatebooking>( entity =>
        {
            entity.HasKey( e => e.BookingId ).HasName( "PRIMARY" );

            entity.ToTable( "templatebookings" );

            entity.HasIndex( e => e.PaymentId, "PaymentId" );

            entity.HasIndex( e => e.TemplateId, "TemplateId" );

            entity.HasIndex( e => e.UserId, "UserId" );

            entity.Property( e => e.BookingDate ).HasColumnType( "datetime" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Status ).HasMaxLength( 50 );

            entity.HasOne( d => d.Payment ).WithMany( p => p.Templatebookings )
                .HasForeignKey( d => d.PaymentId )
                .HasConstraintName( "templatebookings_ibfk_3" );

            entity.HasOne( d => d.Template ).WithMany( p => p.Templatebookings )
                .HasForeignKey( d => d.TemplateId )
                .HasConstraintName( "templatebookings_ibfk_1" );

            entity.HasOne( d => d.User ).WithMany( p => p.Templatebookings )
                .HasForeignKey( d => d.UserId )
                .HasConstraintName( "templatebookings_ibfk_2" );
        } );

        modelBuilder.Entity<User>( entity =>
        {
            entity.HasKey( e => e.UserId ).HasName( "PRIMARY" );

            entity.ToTable( "users" );

            entity.HasIndex( e => e.Email, "Email" ).IsUnique();

            entity.HasIndex( e => e.RoleId, "RoleId" );

            entity.Property( e => e.CreatedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.DeletedAt ).HasColumnType( "datetime" );
            entity.Property( e => e.Email )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.FullName )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.Password )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );
            entity.Property( e => e.UserName )
                .HasMaxLength( 255 )
                .UseCollation( "utf8mb3_general_ci" )
                .HasCharSet( "utf8mb3" );

            entity.HasOne( d => d.Role ).WithMany( p => p.Users )
                .HasForeignKey( d => d.RoleId )
                .HasConstraintName( "users_ibfk_1" );
        } );

        OnModelCreatingPartial( modelBuilder );
    }

    partial void OnModelCreatingPartial( ModelBuilder modelBuilder );
}
