using System.Text.Json;
using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.DTOs.Request.Exam;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExamController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExamController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllExamAsync([FromQuery] GetAllExamRequest request)
    {
        var result = await _mediator.Send(new GetAllExamQuery
        {
            GradeLevelId = request.GradeLevelId,
            ExamTypeId = request.ExamTypeId,
            CreatedBy = request.CreatedBy,
            IsAdmin = request.IsAdmin,
            IsShowCorrectAnswer = request.IsShowCorrectAnswer,
            PageSize = request.PageSize,
            PageNumber = request.PageNumber
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetExamAsync(int id, [FromQuery] GetExamRequest request)
    {
        var result = await _mediator.Send(new GetExamQuery
        {
            ExamId = id,
            IsAdmin = request.IsAdmin,
            IsShowCorrectAnswer = request.IsShowCorrectAnswer
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpPost("create-exam-manual")]
    public async Task<IActionResult> CreateManualAsync([FromBody] ExamCreateManualFromMatrixRequest request)
    {
        var result = await _mediator.Send(new ExamCreateManualFromMatrixCommand
        {
            Title = request.Title,
            Description = request.Description,
            DurationMinutes = request.DurationMinutes,
            GradeLevelId = request.GradeLevelId,
            ExamTypeId = request.ExamTypeId,
            CreatedByNavigationUserId = request.CreatedByUserId,
            MatrixId = request.MatrixId,
            QuestionIds = request.QuestionIds
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status201Created, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpPut("update-exam/{id}")]
    public async Task<IActionResult> UpdateExamAsync(int id, [FromBody] ExamUpdateFromMatrixRequest request)
    {
        var result = await _mediator.Send(new ExamUpdateFromMatrixCommand
        {
            ExamId = id,
            Title = request.Title,
            Description = request.Description,
            DurationMinutes = request.DurationMinutes,
            ExamTypeId = request.ExamTypeId,
            GradeLevelId = request.GradeLevelId,
            QuestionIds = request.QuestionIds
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpPatch("delete-exam/{id}")]
    public async Task<IActionResult> DeleteExamAsync(int id)
    {
        var result = await _mediator.Send(new ExamDeleteCommand
        {
            ExamId = id
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpPatch("restore-exam/{id}")]
    public async Task<IActionResult> RestoreExamAsync(int id)
    {
        var result = await _mediator.Send(new ExamRestoreCommand
        {
            ExamId = id
        });

        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    
}