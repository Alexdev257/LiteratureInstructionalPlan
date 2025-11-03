using LIP.Application.CQRS.Command.Exam;
using LIP.Application.DTOs.Request.Exam;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ExamController(IMediator mediator)
        {
            _mediator = mediator;
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
                QuestionIds = request.QuestionIds,
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
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
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("delete-exam/{id}")]
        public async Task<IActionResult> DeleteExamAsync(int id)
        {
            var result = await _mediator.Send(new ExamDeleteCommand
            {
                ExamId = id
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("restore-exam/{id}")]
        public async Task<IActionResult> RestoreExamAsync(int id)
        {
            var result = await _mediator.Send(new ExamRestoreCommand
            {
                ExamId = id
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
