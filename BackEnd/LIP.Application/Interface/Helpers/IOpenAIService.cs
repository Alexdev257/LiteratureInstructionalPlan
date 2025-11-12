using LIP.Application.DTOs.Response.Exam;

namespace LIP.Application.Interface.Helpers;

public interface IOpenAIService
{
    Task<(decimal Score, string Feedback)> EvaluateAnswerAsync(List<ExamAIHelper> request);
}