using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;

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
            var responseDTO = new GetAllUserResponseDTO();
            var dataList = new List<GetAllUserResponseDTO>();
            var rs = await _userRepository.GetAllAsync(new UserGetAllQuery { RoleId = request.RoleId, Email = request.Email, IsAdmin = request.IsAdmin});
            foreach (var r in rs)
            {
                responseDTO.UserId = r.UserId;
                responseDTO.UserName = r.UserName;
                responseDTO.FullName = r.FullName;
                responseDTO.Email = r.Email;
                responseDTO.CreatedAt = r.CreatedAt;
                responseDTO.DeletedAt = r.DeletedAt;
                responseDTO.IsDeleted = r.IsDeleted;
                responseDTO.RoleId = r.RoleId;
                dataList.Add(responseDTO);
            }
            if (dataList.Count > 0)
            {

                return new GetAllUserResponse
                {
                    IsSuccess = true,
                    Data = dataList,
                    Message = "Get All User Successfully!"
                };
            }
            else
            {
                return new GetAllUserResponse
                {
                    IsSuccess = true,
                    Message = "No User in system!"
                };
            }
        }
    }
}
