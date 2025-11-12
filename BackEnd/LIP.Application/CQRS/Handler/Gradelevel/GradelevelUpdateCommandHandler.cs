using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelUpdateCommandHandler : IRequestHandler<GradelevelUpdateCommand, bool>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelUpdateCommandHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<bool> Handle(GradelevelUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _gradelevelRepository.UpdateAsync(request);
        }
    }
}