using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs.Request.ExamMatrix;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamMatrixController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ExamMatrixController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllMatrixAsync([FromQuery] ExamMatrixGetAllRequest request)
        {
            var result = await _mediator.Send(new ExamMatrixGetAllQuery
            {
                CreatedByUserId = request.CreatedByUserId,
                GradeLevelId = request.GradeLevelId,
                IsAdmin = request.IsAdmin,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetMatrixAsync(int id, [FromQuery] ExamMatrixGetRequest request)
        {
            var result = await _mediator.Send(new ExamMatrixGetQuery
            {
                MatrixId = id,
                IsAdmin = request.IsAdmin
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPost("create-matrix")]
        public async Task<IActionResult> CreateMatrixAsync([FromBody] ExamMatrixCreateRequest request)
        {
            var result = await _mediator.Send(new ExamMatrixCreateCommand
            {
                Title = request.Title,
                Description = request.Description,
                GradeLevelId = request.GradeLevelId,
                CreatedByUserId = request.CreatedByUserId,
                CreatedAt = request.CreatedAt,
                Status = request.Status,
                Notes = request.Notes,
                Details = request.Details.Select(d => new ExamMatrixDetailCreateCommand
                {
                    LessonName = d.LessonName,
                    QuestionType = d.QuestionType,
                    Difficulty = d.Difficulty,
                    Quantity = d.Quantity,
                    ScorePerQuestion = d.ScorePerQuestion,
                    //ExamMatricId = d.ExamMatricId
                }).ToList(),
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status201Created, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPut("update-matrix/{id}")]
        public async Task<IActionResult> UpdateMatrixAsync(int id, [FromBody] ExamMatrixUpdateRequest request)
        {
            var result = await _mediator.Send(new ExamMatrixUpdateCommand
            {
                MatrixId = id,
                Title = request.Title,
                Description = request.Description,
                GradeLevelId = request.GradeLevelId,
                CreatedByUserId = request.CreatedByUserId,
                CreatedAt = request.CreatedAt,
                Status = request.Status,
                Notes = request.Notes,
                Details = request.Details.Select(d => new ExamMatrixDetailUpdateCommand
                {
                    ExamMatrixDetailId = d.ExamMatrixDetailId,
                    LessonName = d.LessonName,
                    QuestionType = d.QuestionType,
                    Difficulty = d.Difficulty,
                    Quantity = d.Quantity,
                    ScorePerQuestion = d.ScorePerQuestion,
                }).ToList(),
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status201Created, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("delete-matrix/{id}")]
        public async Task<IActionResult> DeleteMatrixAsync(int id)
        {
            var result = await _mediator.Send(new ExamMatrixDeleteCommand
            {
                MatrixId = id,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("restore-matrix/{id}")]
        public async Task<IActionResult> RestoreMatrixAsync(int id)
        {
            var result = await _mediator.Send(new ExamMatrixRestoreCommand
            {
                MatrixId = id,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
