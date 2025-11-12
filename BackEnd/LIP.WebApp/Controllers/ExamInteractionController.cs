using System.Text.Json;
using LIP.Application.CQRS.Command.Exam;
using LIP.Application.DTOs.Request.Exam;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExamInteractionController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExamInteractionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("start-exam")]
    public async Task<IActionResult> StartExamAsync([FromQuery] ExamStartRequest request)
    {
        var result = await _mediator.Send(new ExamStartCommand
        {
            ExamId = request.ExamId,
            UserId = request.UserId
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpPost("submit-exam")]
    public async Task<IActionResult> SubmitExamAsync([FromBody] ExamSubmitRequest request)
    {
        var answerList = request.Answers.Select(a => new SubmitAnswerCommandDTO
        {
            QuestionId = a.QuestionId,
            AnswerContent = JsonSerializer.Serialize(a.AnswerContent)
        }).ToList();

        var result = await _mediator.Send(new ExamSubmitCommand
        {
            AttemptId = request.AttemptId,
            Answers = answerList
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpPost("last-submit-exam")]
    public async Task<IActionResult> LastSubmitExamAsync([FromBody] ExamLastSubmitRequest request)
    {
        var answerList = request.Answers.Select(a => new SubmitAnswerCommandDTO
        {
            QuestionId = a.QuestionId,
            AnswerContent = JsonSerializer.Serialize(a.AnswerContent)
        }).ToList();

        var result = await _mediator.Send(new ExamLastSubmitCommand
        {
            AttemptId = request.AttemptId,
            Answers = answerList
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }
}