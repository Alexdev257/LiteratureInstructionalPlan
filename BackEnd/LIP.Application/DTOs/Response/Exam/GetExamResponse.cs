using LIP.Application.DTOs.Response.Template;

namespace LIP.Application.DTOs.Response.Exam;

public class GetExamResponse : CommonResponse<GetExamResponseDTO>
{
}

public class GetExamResponseDTO
{
    public int ExamId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

    public int DurationMinutes { get; set; }

    //public int GradeLevelId { get; set; }
    //public int ExamTypeId { get; set; }
    public GradeLevelDTO GradeLevel { get; set; }
    public ExamTypeDTO ExamType { get; set; }

    public int MatrixId { get; set; }

    //public int CreateByUserId { get; set; }
    public CreatedByDTO CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<QuestionDTO> Questions { get; set; } = new();
}