using MediatR;

namespace LIP.Application.CQRS.Command.Gradelevel
{
    public class GradelevelCreateCommand : IRequest<bool>
    {
        public string? Name { get; set; }
    }
}