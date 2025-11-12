using MediatR;

namespace LIP.Application.CQRS.Command.Gradelevel
{
    public class GradelevelUpdateCommand : IRequest<bool>
    {
        public int GradeLevelId { get; set; }
        public string? Name { get; set; }
    }
}