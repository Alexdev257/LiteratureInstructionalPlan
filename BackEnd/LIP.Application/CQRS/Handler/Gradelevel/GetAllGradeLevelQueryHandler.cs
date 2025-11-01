using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GetAllGradeLevelQueryHandler : IRequestHandler<GetAllGradeLevelQuery, GetAllGradeLevelResponse>
    {
        private readonly IGradelevelRepository _gradeLevelRepository;
        public GetAllGradeLevelQueryHandler(IGradelevelRepository gradeLevelRepository)
        {
            _gradeLevelRepository = gradeLevelRepository;
        }
        public async Task<GetAllGradeLevelResponse> Handle(GetAllGradeLevelQuery request, CancellationToken cancellationToken)
        {
            var rs = await _gradeLevelRepository.GetAllAsync(new GradelevelGetAllQuery { Name = request.Name });
            var dataList = rs.Select(r => new GetAllGradeLevelResponseDTO
            {
                GradeLevelId = r.GradeLevelId,
                Name = r.Name
            }).ToList();

            if (dataList.Count > 0)
            {
                return new GetAllGradeLevelResponse
                {
                    IsSuccess = true,
                    Data = dataList,
                    Message = "Get All Grade Level Successfully!"
                };
            }
            else
            {
                return new GetAllGradeLevelResponse
                {
                    IsSuccess = false,
                    Message = "No Grade Level in system!"
                };
            }
        }
    }
}
