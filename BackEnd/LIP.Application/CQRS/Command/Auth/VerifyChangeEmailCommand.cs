using LIP.Application.DTOs.Response.Auth;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Auth
{
    public class VerifyChangeEmailCommand : IRequest<VerifyChangeEmailResponse>
    {
        public string NewEmail { get; set; } = null!;
        public string OTP { get; set; } = null!;
    }
}
