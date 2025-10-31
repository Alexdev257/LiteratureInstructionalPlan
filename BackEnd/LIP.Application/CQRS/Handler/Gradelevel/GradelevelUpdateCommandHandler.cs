using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GradelevelUpdateCommandHandler : IRequestHandler<GradelevelUpdateCommand, GradeLevelUpdateResponse>
    {
        private readonly IGradelevelRepository _gradelevelRepository;

        public GradelevelUpdateCommandHandler(IGradelevelRepository gradelevelRepository)
        {
            _gradelevelRepository = gradelevelRepository;
        }

        public async Task<GradeLevelUpdateResponse> Handle(GradelevelUpdateCommand request, CancellationToken cancellationToken)
        {
            var gradelevel = await _gradelevelRepository.GetAsync(new GradelevelGetQuery { GradeLevelId = request.GradeLevelId});
            if (gradelevel == null)
            {
                return new GradeLevelUpdateResponse
                {
                    IsSuccess = false,
                    Message = "Grade Level is not found!"
                };
            }
            var rs = await _gradelevelRepository.UpdateAsync(request);
            if (rs)
            {
                return new GradeLevelUpdateResponse
                {
                    IsSuccess = true,
                    Message = "Update Grade Level successfully!"
                };
            }
            else
            {
                return new GradeLevelUpdateResponse
                {
                    IsSuccess = false,
                    Message = "Update Grade Level failed"
                };
            }
        }

        //public async Task<bool> Handle(GradelevelUpdateCommand request, CancellationToken cancellationToken)
        //{
        //    return await _gradelevelRepository.UpdateAsync(request);
        //}
    }
}