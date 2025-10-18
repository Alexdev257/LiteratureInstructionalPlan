using LIP.Application.CQRS.Handler;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DumbDataController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DumbDataController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("generate")]
        public async Task<IActionResult> GenerateRoleAndMore()
        {
            var result = await _mediator.Send(new DumbDataCommand());
            
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }
    }
}