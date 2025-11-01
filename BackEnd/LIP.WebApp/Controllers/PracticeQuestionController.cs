using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Request.PracticeQuestion;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllQuestion([FromQuery] GetAllPracticequestionRequest request)
        {
            var result = await _mediator.Send(new GetAllPracticequestionQuery{
                QuestionType = request.QuestionType,
                GradeLevelId = request.GradeLevelId,
                CreatedByUserId = request.CreatedByUserId,
                IsAdmin = request.IsAdmin,
                IsShowAnswer = request.IsShowAnswer,
                IsShowCorrectAnswer = request.IsShowCorrectAnswer,
                PageSize = request.PageSize,
                PageNumber = request.PageNumber,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetQuestion(int id, [FromQuery] GetPracticequestionRequest request)
        {
            var result = await _mediator.Send(new GetPracticequestionQuery
            {
                QuestionId = id,
                IsAdmin = request.IsAdmin,
                IsShowAnswer = request.IsShowAnswer,
                IsShowCorrectAnswer = request.IsShowCorrectAnswer,
                
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPost("create-question")]
        public async Task<IActionResult> CreateQuestion([FromBody] PracticeQuestionCreateRequest request)
        {
            var result = await _mediator.Send(new PracticequestionCreateCommand
            {
                Content = request.Content,
                QuestionType = request.QuestionType,
                Difficulty = request.Difficulty,
                //Answer = request.Answer,
                Answer = JsonSerializer.Serialize(request.Answer),
                CorrectAnswer = JsonSerializer.Serialize(request.CorrectAnswer),
                GradeLevelId = request.GradeLevelId,
                CreatedByUserId = request.CreatedByUserId,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPut("update-question/{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromBody] PracticeQuestionUpdateRequest request)
        {
            var result = await _mediator.Send(new PracticequestionUpdateCommand
            {
                QuestionId = id,
                Content = request.Content,
                QuestionType = request.QuestionType,
                Difficulty = request.Difficulty,
                //Answer = request.Answer,
                Answer = JsonSerializer.Serialize(request.Answer),
                CorrectAnswer = JsonSerializer.Serialize(request.CorrectAnswer),
                GradeLevelId = request.GradeLevelId,
                CreatedByUserId = request.CreatedByUserId,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("delete-question/{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var result = await _mediator.Send(new PracticequestionDeleteCommand
            {
                QuestionId = id
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpPatch("restore-question/{id}")]
        public async Task<IActionResult> RestoreQuestion(int id)
        {
            var result = await _mediator.Send(new PracticequestionRestoreCommand
            {
                QuestionId = id
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
