using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.DTOs.Request.PracticeQuestion;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PracticeQuestionController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PracticeQuestionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-question")]
        public async Task<IActionResult> CreateQuestion([FromBody] PracticeQuestionCreateRequest request)
        {
            var result = await _mediator.Send(new PracticequestionCreateCommand
            {
                Content = request.Content,
                QuestionType = request.QuestionType,
                Difficulty = request.Difficulty,
                Answer = request.Answer,
                GradeLevelId = request.GradeLevelId,
                CreatedBy = request.CreatedBy,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
