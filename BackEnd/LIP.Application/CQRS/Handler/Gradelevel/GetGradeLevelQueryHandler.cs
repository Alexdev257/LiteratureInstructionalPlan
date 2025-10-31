using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Gradelevel
{
    public class GetGradeLevelQueryHandler : IRequestHandler<GetGradeLevelQuery, GetGradeLevelResponse>
    {
        private readonly IGradelevelRepository _gradeLevelRepository;
        public GetGradeLevelQueryHandler(IGradelevelRepository gradeLevelRepository)
        {
            _gradeLevelRepository = gradeLevelRepository;
        }
        public async Task<GetGradeLevelResponse> Handle(GetGradeLevelQuery request, CancellationToken cancellationToken)
        {
            var rs = await _gradeLevelRepository.GetAsync(new GradelevelGetQuery { GradeLevelId = request.GradeLevelId });
            if (rs == null)
            {
                return new GetGradeLevelResponse
                {
                    IsSuccess = false,
                    Message = "Grade Level is not found!"
                };
            }
            else
            {
                var responseDTO = new GetGradeLevelResponseDTO
                {
                    GradeLevelId = rs.GradeLevelId,
                    Name = rs.Name,
                };
                return new GetGradeLevelResponse
                {
                    IsSuccess = true,
                    Data = responseDTO,
                    Message = "Get Grade Level successfully!"
                };
            }
        }
    }
}
