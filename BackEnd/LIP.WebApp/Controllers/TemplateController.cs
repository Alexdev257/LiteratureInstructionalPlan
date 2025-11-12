using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.DTOs.Request.Template;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TemplateController : ControllerBase
{
    private readonly IMediator _mediatoR;

    public TemplateController(IMediator mediatoR)
    {
        _mediatoR = mediatoR;
    }

    [HttpPost]
    public async Task<IActionResult> UploadTemplate([FromForm] FormData form)
    {
        await using var stream = form.File!.OpenReadStream();

        var request = new TemplateCreateRequest
        {
            Title = form.Title,
            GradeLevelId = form.GradeLevelId,
            Price = form.Price,
            CreatedBy = form.CreatedById,

            FileName = form.File.FileName,
            FileStream = stream
        };

        var result = await _mediatoR.Send(new TemplateCreateCommand
        {
            Title = request.Title,
            GradeLevelId = request.GradeLevelId,
            Price = request.Price,
            CreatedBy = request.CreatedBy,

            FileName = request.FileName,
            FileStream = request.FileStream
        });

        return StatusCode(result.IsSuccess ? StatusCodes.Status201Created : StatusCodes.Status500InternalServerError,
            result);
    }

    /// <summary>
    ///     Get all templates
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllTemplates([FromQuery] TemplateGetAllRequest request)
    {
        var result = await _mediatoR.Send(new TemplateGetAllQuery
            { Search = request.Search, PageSize = request.PageSize, PageNumber = request.PageNumber });

        return StatusCode(StatusCodes.Status200OK, result);
    }

    /// <summary>
    ///     Get template by id
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTemplateById([FromRoute] int id)
    {
        var result = await _mediatoR.Send(new TemplateGetQuery
        {
            TemplateId = id
        });

        return StatusCode(StatusCodes.Status200OK, result);
    }

    /// <summary>
    ///     Get template by user id
    /// </summary>
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetTemplatesByUserId([FromRoute] int userId)
    {
        var result = await _mediatoR.Send(new TemplateGetByUserId
        {
            UserId = userId
        });

        return StatusCode(StatusCodes.Status200OK, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTemplate([FromRoute] int id, [FromForm] FormData form)
    {
        await using var stream = form.File!.OpenReadStream();

        var request = new TemplateUpdateCommand
        {
            Title = form.Title,
            GradeLevelId = form.GradeLevelId,
            Price = form.Price,
            CreatedBy = form.CreatedById,

            FileName = form.File.FileName,
            FileStream = stream
        };

        var result = await _mediatoR.Send(new TemplateUpdateCommand
        {
            TemplateId = id,
            Title = request.Title,
            GradeLevelId = request.GradeLevelId,
            Price = request.Price,
            CreatedBy = request.CreatedBy,

            FileName = request.FileName,
            FileStream = request.FileStream
        });

        return StatusCode(result.IsSuccess ? StatusCodes.Status200OK : StatusCodes.Status500InternalServerError,
            result);
    }

    [HttpPatch("delete/{id}")]
    public async Task<IActionResult> DeleteTemplate([FromRoute] int id)
    {
        var result = await _mediatoR.Send(new TemplateDeleteCommand
        {
            TemplateId = id
        });

        return StatusCode(result.IsSuccess ? StatusCodes.Status200OK : StatusCodes.Status500InternalServerError,
            result);
    }

    [HttpPatch("restore/{id}")]
    public async Task<IActionResult> RestoreTemplate([FromRoute] int id)
    {
        var result = await _mediatoR.Send(new TemplateRestoreCommand
        {
            TemplateId = id
        });

        return StatusCode(result.IsSuccess ? StatusCodes.Status200OK : StatusCodes.Status500InternalServerError,
            result);
    }

    public class FormData
    {
        public string Title { get; set; } = string.Empty;
        public int GradeLevelId { get; set; }
        public decimal Price { get; set; }
        public int CreatedById { get; set; }
        public IFormFile? File { get; set; }
    }
}