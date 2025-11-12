using LIP.Application.DTOs.Response.Auth;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class VerifyForgotPasswordCommand : IRequest<VerifyForgotPasswordResponse>
{
    public string Email { get; set; } = null!;
    public string OTP { get; set; } = null!;
}