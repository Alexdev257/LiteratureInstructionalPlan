using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand, LogoutResponse>
    {
        private readonly IRedisHelper _redisHelper;
        public LogoutCommandHandler(IRedisHelper redisHelper)
        {
            _redisHelper = redisHelper;
        }
        public async Task<LogoutResponse> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            
            //var result = await _redisHelper.GetAsync<string>($"RT_{request.UserId}");
            var result = await _redisHelper.ExistAsync($"RT_{request.UserId}");
            if(result)
            {
                await _redisHelper.RemoveAsync($"RT_{request.UserId}");
                return new LogoutResponse
                {
                    IsSuccess = true,
                    Message = "Logout Successfully!"
                };
            }
            else
            {
                return new LogoutResponse
                {
                    IsSuccess = false,
                    Message = "Logout Failed!",
                };
            }
        }
    }
}
