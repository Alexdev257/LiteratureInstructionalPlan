using LIP.Application.CQRS.Command.Auth;
using LIP.Application.CQRS.Command.User;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, UpdateProfileResponse>
    {
        private readonly IUserRepository _userRepository;

        public UpdateProfileCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<UpdateProfileResponse> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetAsync(new Query.User.UserGetQuery { UserId = request.UserId });
            if (user == null)
            {
                return new UpdateProfileResponse
                {
                    IsSuccess = false,
                    Message = "User is not found!"
                };
            }

            user.UserName = request.UserName;
            user.FullName = request.FullName;
            var rs = await _userRepository.UpdateAsync(new UserUpdateCommand
            {
                UserId = user.UserId,
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                Password = user.Password,
                RoleId = user.RoleId,
                CreatedAt = user.CreatedAt,
                IsDeleted = user.IsDeleted,
                DeletedAt = user.DeletedAt,
            });

            if (rs)
            {
                return new UpdateProfileResponse
                {
                    IsSuccess = true,
                    Message = "Update Profile Successfully!"
                };
            }
            else
            {
                return new UpdateProfileResponse
                {
                    IsSuccess = false,
                    Message = "Update Profile Failed!"
                };
            }
        }
    }
}
