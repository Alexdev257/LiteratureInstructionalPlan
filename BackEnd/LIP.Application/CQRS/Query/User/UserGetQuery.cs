using MediatR;

namespace LIP.Application.CQRS.Query.User;

public class UserGetQuery : IRequest<Domain.Entities.User?>
{
    public int UserId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}