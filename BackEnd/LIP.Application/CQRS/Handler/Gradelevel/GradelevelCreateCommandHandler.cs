using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelCreateCommandHandler : IRequestHandler<GradelevelCreateCommand, bool>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelCreateCommandHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<bool> Handle(GradelevelCreateCommand request, CancellationToken cancellationToken)
        {
            return await _gradelevelRepository.CreateAsync(request);
        }
    }
}