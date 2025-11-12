namespace LIP.Application.DTOs.Request.User;

public class GetUserRequest
{
    //public int UserId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}