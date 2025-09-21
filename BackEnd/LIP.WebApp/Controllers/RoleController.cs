using LIP.Application.CQRS.Command.Role;
using LIP.Application.DTOs.Request.Role;
using LIP.Application.DTOs.Response.Role;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleCreateRequest request)
        {
            var result = await _mediator.Send(new RoleCreateCommand
            {
                RoleName = request.RoleName
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status201Created, result);

            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
