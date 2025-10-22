using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelGetQueryHandler : IRequestHandler<GradelevelGetQuery, LIP.Domain.Entities.GradeLevel?>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelGetQueryHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<LIP.Domain.Entities.GradeLevel?> Handle(GradelevelGetQuery request, CancellationToken cancellationToken)
        {
            return await _gradelevelRepository.GetAsync(request);
        }
    }
}