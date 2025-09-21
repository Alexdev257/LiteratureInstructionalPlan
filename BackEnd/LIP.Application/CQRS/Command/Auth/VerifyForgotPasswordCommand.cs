using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Auth
{
    public class VerifyForgotPasswordCommand : IRequest<VerifyForgotPasswordResponse>
    {
        public string Email { get; set; } = null!;
        public string OTP { get; set; } = null!;
    }
}
