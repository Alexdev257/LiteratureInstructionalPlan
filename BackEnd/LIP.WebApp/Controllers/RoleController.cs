using LIP.Application.CQRS.Command.Role;
using LIP.Application.CQRS.Query.Role;
using LIP.Application.DTOs.Request.Role;
using LIP.Application.DTOs.Response.Role;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPut("{RoleId}")]
        public async Task<IActionResult> UpdateRole(int RoleId, [FromBody] RoleUpdateRequest request)
        {
            var result = await _mediator.Send(new RoleUpdateCommand
            {
                RoleId = RoleId,
                RoleName = request.RoleName
            });

            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);

            else return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        //[Authorize(Policy = "StudentOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAllRole()
        {
            var result = await _mediator.Send(new RoleGetAllQuery());

            return StatusCode(StatusCodes.Status200OK, result);
        }

        [HttpGet("{RoleId}")]
        public async Task<IActionResult> GetRoleById(int RoleId)
        {
            var result = await _mediator.Send(new RoleGetQuery
            {
                RoleId = RoleId
            });

            return StatusCode(result.IsSuccess ? StatusCodes.Status200OK : StatusCodes.Status500InternalServerError, result);
        }
    }
}
