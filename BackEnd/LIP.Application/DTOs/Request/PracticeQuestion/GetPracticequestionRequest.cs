namespace LIP.Application.DTOs.Request.PracticeQuestion;

public class GetPracticequestionRequest
{
    //public int QuestionId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowAnswer { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;
}