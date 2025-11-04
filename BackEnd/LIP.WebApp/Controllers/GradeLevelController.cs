using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.DTOs.Request.GradeLevel;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeLevelController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GradeLevelController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllGradeLevels([FromQuery] GetAllGradeLevelRequest request)
        {
            var result = await _mediator.Send(new GetAllGradeLevelQuery
            {
                Name = request.Name,
                PageSize = request.PageSize,
                PageNumber = request.PageNumber
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetGradeLevelById(int id)
        {
            var result = await _mediator.Send(new GetGradeLevelQuery
            {
                GradeLevelId = id
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPost("create-gradelevel")]
        public async Task<IActionResult> CreateGradeLevel([FromBody] GradeLevelCreateRequest request)
        {
            var result = await _mediator.Send(new GradelevelCreateCommand
            {
                Name = request.Name,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPut("update-gradelevel/{id}")]
        public async Task<IActionResult> UpdateGradeLevel(int id, [FromBody] GradeLevelUpdateRequest request)
        {
            var result = await _mediator.Send(new GradelevelUpdateCommand
            {
                GradeLevelId = id,
                Name = request.Name,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpDelete("delete-gradelevel/{id}")]
        public async Task<IActionResult> DeleteGradeLevel(int id)
        {
            var result = await _mediator.Send(new GradelevelDeleteCommand
            {
                GradeLevelId = id
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
