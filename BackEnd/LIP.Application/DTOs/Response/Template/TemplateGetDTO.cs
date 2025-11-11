namespace LIP.Application.DTOs.Response.Template;

public class TemplateGetDTO
{
    public int TemplateId { get; set; }

    public string Title { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;

    public string ViewPath { get; set; } = string.Empty;

    public GradeLevelDTO? GradeLevel { get; set; }

    public float Price { get; set; }

    public CreatedByDTO? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int TotalDownload { get; set; }
    
    public bool IsDeleted { get; set; }
}

public class GradeLevelDTO
{
    public int GradeLevelId { get; set; }
    public string Name { get; set; } = string.Empty;
    

}

public class CreatedByDTO
{
    public int UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class ExamTypeDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}