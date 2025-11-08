namespace LIP.Application.DTOs.Request.Exam;

public class GetAllExamRequest : PaginationRequest
{
    public int? GradeLevelId { get; set; }
    public int? ExamTypeId { get; set; }
    public int? CreatedBy { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;
}