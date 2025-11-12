// filepath: /home/tiehung/Project/LiteratureInstructionalPlan/BackEnd/LIP.Infrastructure/Implements/Helpers/OpenAIService.cs
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Helpers;
using Microsoft.Extensions.Configuration;

namespace LIP.Infrastructure.Implements.Helpers;

public class OpenAIService : IOpenAIService
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public OpenAIService(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient();
    }

    // Contract:
    // Input: list of ExamAIHelper (QuestionContent, CorrectAnswer, UserAnswer, Score = max score per question)
    // Output: tuple (totalScoreAwarded, feedbackJson)
    // Behavior: call OpenAI completions (chat) API using model from config (or gpt-3.5-turbo if missing),
    // send prompt instructing model to grade each answer and return a JSON array of per-question feedback.
    public async Task<(decimal Score, string Feedback)> EvaluateAnswerAsync(List<ExamAIHelper> request)
    {
        var openAiConfig = _configuration.GetSection("OpenAI");
        var apiKey = openAiConfig["ApiKey"];
        var apiBase = openAiConfig["ApiBase"] ?? "https://api.openai.com";
        var model = openAiConfig["Model"] ?? "gpt-3.5-turbo";

        if (string.IsNullOrWhiteSpace(apiKey))
            return (0, "{\"error\":\"OpenAI ApiKey is not configured\"}");

        var systemPrompt = "You are an assistant that grades student free-text answers.\n" +
                           "For each question, compare the student's answer with the correct answer and assign a numeric score (0..max).\n" +
                           "Provide a short justification and actionable feedback.\n" +
                           "Return ONLY a single JSON object with properties: 'questions' (array) and 'totalScore'.\n" +
                           "Each question item should have: questionIndex (0-based), score, maxScore, feedback.\n" +
                           "Do not include any additional text outside the JSON. Use the numeric values for scores.\n";

        // Build the content for the model
        var sb = new StringBuilder();
        sb.AppendLine("Here are the questions and answers:");
        for (int i = 0; i < request.Count; i++)
        {
            var q = request[i];
            sb.AppendLine($"QuestionIndex: {i}");
            sb.AppendLine($"Question: {q.QuestionContent}");
            sb.AppendLine($"CorrectAnswer: {q.CorrectAnswer}");
            sb.AppendLine($"StudentAnswer: {q.UserAnswer}");
            sb.AppendLine($"MaxScore: {q.Score}");
            sb.AppendLine();
        }

        var userPrompt = sb.ToString();

        // craft Chat API payload
        var chatRequest = new
        {
            model,
            messages = new[] {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
            temperature = 0.0
        };

        var json = JsonSerializer.Serialize(chatRequest);
        var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{apiBase}/v1/chat/completions");
        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        requestMessage.Content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var resp = await _httpClient.SendAsync(requestMessage);
            var respText = await resp.Content.ReadAsStringAsync();
            if (!resp.IsSuccessStatusCode)
            {
                return (0, JsonSerializer.Serialize(new { error = "OpenAI returned non-success status", details = respText }));
            }

            using var doc = JsonDocument.Parse(respText);
            // Try to extract the assistant message
            var root = doc.RootElement;
            var choices = root.GetProperty("choices");
            if (choices.GetArrayLength() == 0)
                return (0, "{\"error\":\"No choices returned from OpenAI\"}");

            var assistantMsg = choices[0].GetProperty("message").GetProperty("content").GetString();
            if (string.IsNullOrWhiteSpace(assistantMsg))
                return (0, "{\"error\":\"Empty assistant message\"}");

            // Try parse assistantMsg as JSON
            try
            {
                using var parsed = JsonDocument.Parse(assistantMsg);
                var totalScore = 0m;
                var questions = new List<ExamAIQuestionFeedback>();
                if (parsed.RootElement.TryGetProperty("questions", out var questionsEl) && questionsEl.ValueKind == JsonValueKind.Array)
                {
                    foreach (var item in questionsEl.EnumerateArray())
                    {
                        var idx = item.GetProperty("questionIndex").GetInt32();
                        var score = item.GetProperty("score").GetDecimal();
                        var max = item.GetProperty("maxScore").GetDecimal();
                        var fb = item.GetProperty("feedback").GetString() ?? string.Empty;
                        totalScore += score;
                        questions.Add(new ExamAIQuestionFeedback
                        {
                            QuestionIndex = idx,
                            Score = score,
                            MaxScore = max,
                            Feedback = fb
                        });
                    }
                }

                var feedbackJson = JsonSerializer.Serialize(new { questions, totalScore });
                return (totalScore, feedbackJson);
            }
            catch (JsonException)
            {
                // assistant didn't return strict JSON; return raw content inside feedback
                return (0, JsonSerializer.Serialize(new { error = "Assistant response not JSON", content = assistantMsg }));
            }
        }
        catch (Exception ex)
        {
            return (0, JsonSerializer.Serialize(new { error = "Exception when calling OpenAI", details = ex.Message }));
        }
    }
}
