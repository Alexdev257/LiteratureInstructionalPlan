using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Gradelevel;

public class GetAllGradeLevelQueryHandler : IRequestHandler<GetAllGradeLevelQuery, GetAllGradeLevelResponse>
{
    private readonly IGradelevelRepository _gradeLevelRepository;

    public GetAllGradeLevelQueryHandler(IGradelevelRepository gradeLevelRepository)
    {
        _gradeLevelRepository = gradeLevelRepository;
    }

    public async Task<GetAllGradeLevelResponse> Handle(GetAllGradeLevelQuery request,
        CancellationToken cancellationToken)
    {
        var rs = await _gradeLevelRepository.GetAllAsync(new GradelevelGetAllQuery { Name = request.Name });
        var dataList = rs.Select(r => new GetAllGradeLevelResponseDTO
        {
            GradeLevelId = r.GradeLevelId,
            Name = r.Name
        }).ToList();

        //if (dataList.Count > 0)
        //{
        //    return new GetAllGradeLevelResponse
        //    {
        //        IsSuccess = true,
        //        Data = dataList,
        //        Message = "Get All Grade Level Successfully!"
        //    };
        //}
        //else
        //{
        //    return new GetAllGradeLevelResponse
        //    {
        //        IsSuccess = false,
        //        Message = "No Grade Level in system!"
        //    };
        //}

        var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
        return new GetAllGradeLevelResponse
        {
            IsSuccess = paged.Items.Any(),
            Data = paged,
            Message = paged.Items.Any()
                ? "Get All Grade Level successfully!"
                : "No Grade Level in system!"
        };
    }
}