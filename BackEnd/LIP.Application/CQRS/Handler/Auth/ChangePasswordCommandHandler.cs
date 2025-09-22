using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, ChangePasswordResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IBcryptHelper _bcryptHelper;
        public ChangePasswordCommandHandler(IUserRepository userRepository, IBcryptHelper bcryptHelper)
        {
            _userRepository = userRepository;
            _bcryptHelper = bcryptHelper;
        }
        public async Task<ChangePasswordResponse> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var userList = await _userRepository.GetAllAsync(new Query.User.UserGetAllQuery() { Email = request.Email });
            var user = userList.ToList().FirstOrDefault();
            if (user == null)
            {
                return new ChangePasswordResponse
                {
                    IsSuccess = false,
                    Message = "Account does not exist!",
                };
            }

            var isPasswordValid = _bcryptHelper.VerifyPassword(request.Password, user.Password);
            if (!isPasswordValid)
            {
                return new ChangePasswordResponse
                {
                    IsSuccess = false,
                    Message = "Old password is incorrect!",
                };
            }

            if (request.Password == request.NewPassword)
            {
                return new ChangePasswordResponse
                {
                    IsSuccess = false,
                    Message = "New password must be different from old password!",
                };
            }
            var hasedNewPassword = _bcryptHelper.HashPassword(request.NewPassword);
            var rs = await _userRepository.UpdateAsync(new Command.User.UserUpdateCommand
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Password = hasedNewPassword,
                CreatedAt = user.CreatedAt,
                DeletedAt = user.DeletedAt,
                FullName = user.FullName,
                IsDeleted = user.IsDeleted,
                RoleId = user.RoleId,
            });

            if (rs)
            {
                return new ChangePasswordResponse
                {
                    IsSuccess = true,
                    Message = "Change password successfully!",
                };
            }
            else
            {
                return new ChangePasswordResponse
                {
                    IsSuccess = false,
                    Message = "Change password failed!",
                };
            }
        }
    }
}
