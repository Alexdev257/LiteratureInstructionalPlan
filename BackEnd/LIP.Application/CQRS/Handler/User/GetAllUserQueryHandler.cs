using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.User
{
    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, GetAllUserResponse>
    {
        private readonly IUserRepository _userRepository;
        public GetAllUserQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<GetAllUserResponse> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
        {
            //var responseDTO = new GetAllUserResponseDTO();
            //var dataList = new List<GetAllUserResponseDTO>();
            var rs = await _userRepository.GetAllAsync(new UserGetAllQuery { RoleId = request.RoleId, Email = request.Email, IsAdmin = request.IsAdmin});
            //foreach (var r in rs)
            //{
            //    responseDTO.UserId = r.UserId;
            //    responseDTO.UserName = r.UserName;
            //    responseDTO.FullName = r.FullName;
            //    responseDTO.Email = r.Email;
            //    responseDTO.CreatedAt = r.CreatedAt;
            //    responseDTO.DeletedAt = r.DeletedAt;
            //    responseDTO.IsDeleted = r.IsDeleted;
            //    responseDTO.RoleId = r.RoleId;
            //    dataList.Add(responseDTO);
            //}
            var dataList = rs.Select(r => new GetAllUserResponseDTO
            {
                UserId = r.UserId,
                UserName = r.UserName,
                FullName = r.FullName,
                Email = r.Email,
                CreatedAt = r.CreatedAt,
                DeletedAt = r.DeletedAt,
                IsDeleted = r.IsDeleted,
                RoleId = r.RoleId

            }).ToList();

            var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
            return new GetAllUserResponse
            {
                IsSuccess = paged.Items.Any(),
                Data = paged,
                Message = paged.Items.Any()
                ? "Get All Users successfully!"
                : "No Users in system!"
            };
        }
    }
}
