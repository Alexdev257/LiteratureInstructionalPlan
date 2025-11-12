using LIP.Application.CQRS.Query.User;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.User;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserReponse>
{
    private readonly IUserRepository _userRepository;

    public GetUserQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetUserReponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var rs = await _userRepository.GetAsync(new UserGetQuery
            { UserId = request.UserId, IsAdmin = request.IsAdmin });
        if (rs == null)
            return new GetUserReponse
            {
                IsSuccess = false,
                Message = "User is not exist!"
            };

        var responseDTO = new GetUserResponseDTO
        {
            UserId = rs.UserId,
            UserName = rs.UserName,
            FullName = rs.FullName,
            Email = rs.Email,
            CreatedAt = rs.CreatedAt,
            DeletedAt = rs.DeletedAt,
            IsDeleted = rs.IsDeleted,
            RoleId = rs.RoleId
        };
        return new GetUserReponse
        {
            IsSuccess = true,
            Data = responseDTO,
            Message = "Get User successfully!"
        };
    }
}