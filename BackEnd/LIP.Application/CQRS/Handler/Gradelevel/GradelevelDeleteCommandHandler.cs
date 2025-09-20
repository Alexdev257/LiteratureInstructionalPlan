using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelDeleteCommandHandler : IRequestHandler<GradelevelDeleteCommand, bool>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelDeleteCommandHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<bool> Handle(GradelevelDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _gradelevelRepository.DeleteAsync(request);
        }
    }
}