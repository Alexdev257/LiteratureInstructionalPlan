using MediatR;
using LIP.Application.DTOs.Response.Role;

namespace LIP.Application.CQRS.Query.Role
{
    public class RoleGetAllQuery : IRequest<RoleGetAllResponse>
    {

    }
}