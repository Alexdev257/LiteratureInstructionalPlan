using LIP.Application.DTOs.Response.Auth;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class VerifyRegisterCommand : IRequest<VerifyRegisterResponse>
{
    public string Email { get; set; } = null!;
    public string Otp { get; set; } = null!;
}