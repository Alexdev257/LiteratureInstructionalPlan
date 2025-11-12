using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.DTOs.Request.ExamType;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExamTypeController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExamTypeController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllExamTypes([FromQuery] GetAllExamTypeRequest request)
    {
        var result = await _mediator.Send(new GetAllExamTypeQuery
        {
            Name = request.Name,
            PageSize = request.PageSize,
            PageNumber = request.PageNumber
        });
        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetExamTypeById(int id)
    {
        var result = await _mediator.Send(new GetExamTypeQuery
        {
            ExamTypeId = id
        });
        if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
        return StatusCode(StatusCodes.Status400BadRequest, result);
    }
}