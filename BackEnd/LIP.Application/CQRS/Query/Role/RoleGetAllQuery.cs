using LIP.Application.DTOs.Response.Role;
using MediatR;

namespace LIP.Application.CQRS.Query.Role;

public class RoleGetAllQuery : IRequest<RoleGetAllResponse>
{
}