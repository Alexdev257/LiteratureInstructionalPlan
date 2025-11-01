using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

/// <summary>
/// 1 - 3
/// 1 - 4 => 10/7
/// </summary>


// 2 cau de bai 1
// 1 cau kho bai 2

// id : 13
// id : 18
// id : 50

// matrix 3 dong du lieu = 

// matrix_details : ref matrix_id : 

//public string? LessonName { get; set; }

//public string? QuestionType { get; set; }

//public string? Difficulty { get; set; }

//public decimal? ScorePerQuestion { get; set; }

public partial class ExamMatrix
{
    [Key]
    public int MatrixId
    {
        get; set;
    }

    public string? Title
    {
        get; set;
    }

    public string? Description
    {
        get; set;
    }

    public int? GradeLevelId
    {
        get; set;
    }

    public int? CreatedByNavigationUserId
    {
        get; set;
    }

    public DateTime? CreatedAt
    {
        get; set;
    }

    public string? Status
    {
        get; set;
    }

    //public string? LessonName { get; set; }

    //public string? QuestionType { get; set; }

    //public string? Difficulty { get; set; }

    //public int? Quantity { get; set; }

    //public decimal? ScorePerQuestion { get; set; }

    public string? Notes
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

    public virtual User? CreatedByNavigation
    {
        get; set;
    }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual GradeLevel? GradeLevel
    {
        get; set;
    }
    
    public virtual ICollection<ExamMatrixDetail> Exammatrixdetails { get; set; } = new List<ExamMatrixDetail>();
}