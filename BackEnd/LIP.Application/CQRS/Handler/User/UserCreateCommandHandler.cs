using LIP.Application.CQRS.Command.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User
{
    public class UserCreateCommandHandler : IRequestHandler<UserCreateCommand, UserCreateResponse>
    {
        private readonly IUserRepository _userRepository;

        public UserCreateCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserCreateResponse> Handle(UserCreateCommand request, CancellationToken cancellationToken)
        {
            var userList = await _userRepository.GetAllAsync(new Query.User.UserGetAllQuery { Email = request.Email });
            var existEmailUser = userList.ToList().FirstOrDefault();

            if (existEmailUser != null)
            {
                return new UserCreateResponse
                {
                    IsSuccess = false,
                    Message = "Email has existed in the system already!"
                };
            }
            
            request.CreatedAt = DateTime.UtcNow;
            var rs = await _userRepository.CreateAsync(request);
            if (rs)
            {
                return new UserCreateResponse
                {
                    IsSuccess = true,
                    Message = "Create User successfully!"
                };
            }
            else
            {
                return new UserCreateResponse
                {
                    IsSuccess = false,
                    Message = "Create User failed"
                };
            }
        }
    }
}