using LIP.Application.CQRS.Command.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User
{
    public class UserUpdateCommandHandler : IRequestHandler<UserUpdateCommand, UserUpdateResponse>
    {
        private readonly IUserRepository _userRepository;

        public UserUpdateCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        //public async Task<bool> Handle(UserUpdateCommand request, CancellationToken cancellationToken)
        //{
        //    return await _userRepository.UpdateAsync(request);
        //}

        public async Task<UserUpdateResponse> Handle(UserUpdateCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetAsync(new Query.User.UserGetQuery { UserId = request.UserId });
            if(user == null)
            {
                return new UserUpdateResponse
                {
                    IsSuccess = false,
                    Message = "User is not found!"
                };
            }
            var rs =  await _userRepository.UpdateAsync(request);
            if (rs)
            {
                return new UserUpdateResponse
                {
                    IsSuccess = true,
                    Message = "Update User successfully!"
                };
            }
            else
            {
                return new UserUpdateResponse
                {
                    IsSuccess = false,
                    Message = "Update User failed!"
                };
            }
        }
    }
}