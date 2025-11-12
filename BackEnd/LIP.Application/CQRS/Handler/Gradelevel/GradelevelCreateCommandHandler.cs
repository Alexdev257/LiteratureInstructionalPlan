using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel;

public class GradelevelCreateCommandHandler : IRequestHandler<GradelevelCreateCommand, GradeLevelCreateResponse>
{
    private readonly IGradelevelRepository _gradelevelRepository;

    public GradelevelCreateCommandHandler(IGradelevelRepository gradelevelRepository)
    {
        _gradelevelRepository = gradelevelRepository;
    }

    public async Task<GradeLevelCreateResponse> Handle(GradelevelCreateCommand request,
        CancellationToken cancellationToken)
    {
        var rs = await _gradelevelRepository.CreateAsync(request);
        if (rs)
            return new GradeLevelCreateResponse
            {
                IsSuccess = true,
                Message = "Create Gradelevel successfully!"
            };

        return new GradeLevelCreateResponse
        {
            IsSuccess = false,
            Message = "Create Gradelevel failed"
        };
    }

    //public async Task<bool> Handle(GradelevelCreateCommand request, CancellationToken cancellationToken)
    //{
    //    return await _gradelevelRepository.CreateAsync(request);
    //}
}