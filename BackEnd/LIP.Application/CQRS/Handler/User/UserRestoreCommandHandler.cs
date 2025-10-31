using LIP.Application.CQRS.Command.User;
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
    public class UserRestoreCommandHandler : IRequestHandler<UserRestoreCommand, UserRestoreResponse>
    {
        private readonly IUserRepository _userRepository;

        public UserRestoreCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<UserRestoreResponse> Handle(UserRestoreCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetAsync(new Query.User.UserGetQuery { UserId = request.UserId, IsAdmin = true });
            if (user == null)
            {
                return new UserRestoreResponse
                {
                    IsSuccess = false,
                    Message = "User is not found!"
                };
            }

            if(!user.IsDeleted)
            {
                return new UserRestoreResponse
                {
                    IsSuccess = false,
                    Message = "User is not deleted!"
                };
            }

            user.IsDeleted = false;
            user.DeletedAt = DateTime.MinValue;
            var rs = await _userRepository.RestoreAsync(request);
            if (rs)
            {
                return new UserRestoreResponse
                {
                    IsSuccess = true,
                    Message = "Restore User successfully!"
                };
            }
            else
            {
                return new UserRestoreResponse
                {
                    IsSuccess = false,
                    Message = "Restore User failed!"
                };
            }

        }
    }
}
