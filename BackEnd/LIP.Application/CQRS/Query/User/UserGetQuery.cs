using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.User
{
    public class UserGetQuery : IRequest<LIP.Domain.Entities.User?>
    {
        public int UserId { get; set; }
    }
}