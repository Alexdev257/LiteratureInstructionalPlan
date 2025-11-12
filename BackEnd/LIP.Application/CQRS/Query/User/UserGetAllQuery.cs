using MediatR;

namespace LIP.Application.CQRS.Query.User;

public class UserGetAllQuery : IRequest<IEnumerable<Domain.Entities.User>>
{
    public int? RoleId { get; set; } = null!;
    public string? Email { get; set; } = null!;
    public bool? IsAdmin { get; set; } = false!;
}