using MediatR;

namespace LIP.Application.CQRS.Command.Gradelevel
{
    public class GradelevelDeleteCommand : IRequest<bool>
    {
        public int GradeLevelId { get; set; }
    }
}