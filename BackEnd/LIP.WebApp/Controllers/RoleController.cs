using LIP.Application.CQRS.Query.Role;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoleController : ControllerBase
{
    private readonly IMediator _mediator;

    public RoleController(IMediator mediator)
    {
        _mediator = mediator;
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

        return StatusCode(result.IsSuccess ? StatusCodes.Status200OK : StatusCodes.Status500InternalServerError,
            result);
    }
}