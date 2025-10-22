using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelGetAllQueryHandler : IRequestHandler<GradelevelGetAllQuery, IEnumerable<LIP.Domain.Entities.GradeLevel>>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelGetAllQueryHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.GradeLevel>> Handle(GradelevelGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _gradelevelRepository.GetAllAsync(request);
        }
    }
}