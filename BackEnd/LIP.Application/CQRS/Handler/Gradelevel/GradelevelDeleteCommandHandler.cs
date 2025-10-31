using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelDeleteCommandHandler : IRequestHandler<GradelevelDeleteCommand, GradeLevelDeleteResponse>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelDeleteCommandHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<GradeLevelDeleteResponse> Handle(GradelevelDeleteCommand request, CancellationToken cancellationToken)
        {
            var gradelevel = await _gradelevelRepository.GetAsync(new GradelevelGetQuery { GradeLevelId = request.GradeLevelId });
            if (gradelevel == null)
            {
                return new GradeLevelDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Grade Level is not found!"
                };
            }
            var rs = await _gradelevelRepository.DeleteAsync(request);
            if (rs)
            {
                return new GradeLevelDeleteResponse
                {
                    IsSuccess = true,
                    Message = "Delete Grade Level successfully!"
                };
            }
            else
            {
                return new GradeLevelDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Delete Grade Level failed"
                };
            }
        }

        //public async Task<bool> Handle(GradelevelDeleteCommand request, CancellationToken cancellationToken)
        //{
        //    return await _gradelevelRepository.DeleteAsync(request);
        //}
    }
}