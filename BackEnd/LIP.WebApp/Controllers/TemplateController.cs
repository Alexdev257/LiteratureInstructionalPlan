using LIP.Application.CQRS.Command.Template;
using LIP.Application.DTOs.Request.Template;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly IMediator _mediatoR;

        public TemplateController(IMediator mediatoR)
        {
            _mediatoR = mediatoR;
        }

        public class FormData
        {
            public string Title { get; set; } = string.Empty;
            public int GradeLevelId { get; set; }
            public int SeriesId { get; set; }
            public int CreatedById { get; set; }
            public IFormFile? File { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> UploadTemplate([FromForm] FormData form)
        {
            using var stream = form.File!.OpenReadStream();

            var request = new TemplateCreateRequest
            {
                Title = form.Title,
                GradeLevelId = form.GradeLevelId,
                SeriesId = form.SeriesId,
                CreatedBy = form.CreatedById,
                FileName = form.File.FileName,
                FileStream = stream
            };

            var result = await _mediatoR.Send(new TemplateCreateCommand
            {
                Title = request.Title,
                GradeLevelId = request.GradeLevelId,
                SeriesId = request.SeriesId,
                CreatedBy = request.CreatedBy,
                FileName = request.FileName,
                FileStream = request.FileStream
            });

            return StatusCode(result.IsSuccess ? StatusCodes.Status201Created : StatusCodes.Status500InternalServerError, result);
        }
    }
}
