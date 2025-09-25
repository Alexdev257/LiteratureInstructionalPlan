﻿using LIP.Application.CQRS.Command.User;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Request.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllUserAsync([FromQuery] GetAllUserQuery request)
        {
            var result = await _mediator.Send(request);
            if(result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetUserAsync(int id)
        {
            var result = await _mediator.Send(new GetUserQuery { UserId = id});
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }


        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserCreateRequest request)
        {
            var result = await _mediator.Send(new UserCreateCommand
            {
                UserName = request.UserName,
                Email = request.Email,
                FullName = request.FullName,
                CreatedAt = request.CreatedAt,
                Password = request.Password,
                RoleId = request.RoleId,
            });
            if (result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
        [HttpPut("update-user/{id}")]
        public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] UserUpdateRequest request)
        {
            var result = await _mediator.Send(new UserUpdateCommand
            {
                UserId = id,
                UserName = request.UserName,
                Email = request.Email,
                FullName = request.FullName,
                CreatedAt = request.CreatedAt,
                DeletedAt = request.DeletedAt,
                IsDeleted = request.IsDeleted,
                RoleId = request.RoleId,
            });
            if(result.IsSuccess) return StatusCode(StatusCodes.Status200OK, result);
            else return StatusCode(StatusCodes.Status400BadRequest, result);
        }
    }
}
