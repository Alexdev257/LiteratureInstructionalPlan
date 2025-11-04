using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Request.ExamAttempt;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamAttemptController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ExamAttemptController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllAttemptAsync([FromQuery] GetAllExamAttemptRequest request)
        {
            var result = await _mediator.Send(new GetAllExamAttemptQuery
            {
                ExamId = request.ExamId,
                UserId = request.UserId,
                Status = request.Status,
                IsAdmin = request.IsAdmin,
                PageSize = request.PageSize,
                PageNumber = request.PageNumber,
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetAttemptAsync(int id, [FromQuery] GetExamAttemptRequest request)
        {
            var result = await _mediator.Send(new GetExamAttemptQuery
            {
                AttemptId = id,
                IsAdmin = request.IsAdmin
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("delete-attempt/{id}")]
        public async Task<IActionResult> DeleteAttemptAsync(int id)
        {
            var result = await _mediator.Send(new ExamattemptDeleteCommand
            {
                AttemptId = id
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("restore-attempt/{id}")]
        public async Task<IActionResult> RestoreAttemptAsync(int id)
        {
            var result = await _mediator.Send(new ExamattemptRestoreCommand
            {
                AttemptId = id
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
