namespace LIP.Application.DTOs.Response.User;

public class GetUserReponse : CommonResponse<GetUserResponseDTO>
{
}

public class GetUserResponseDTO
{
    public int UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    //public string Password { get; set; } = null!;
    public int? RoleId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime DeletedAt { get; set; }
}