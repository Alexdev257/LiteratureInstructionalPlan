using LIP.Application.CQRS.Command.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand request)
        {
            var result = await _mediator.Send(request);
            if (result) return StatusCode(StatusCodes.Status201Created, new { Message = "User registered successfully!" });
            else return StatusCode(StatusCodes.Status400BadRequest, new { Message = "User registration failed!" });
        }
    }
}
