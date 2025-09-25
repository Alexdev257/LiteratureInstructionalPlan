﻿using LIP.Application.CQRS.Command.Auth;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class RefreshCommandHandler : IRequestHandler<RefreshCommand, RefreshResponse>
    {
        private readonly ISessionExtensions _sessionExtensions;
        private readonly IJwtHelper _jwtHelper;
        private readonly IUserRepository _userRepository;
        private readonly IRedisHelper _redisHelper;
        public RefreshCommandHandler(ISessionExtensions sessionExtensions, IJwtHelper jwtHelper, IUserRepository userRepository, IRedisHelper redisHelper)
        {
            _sessionExtensions = sessionExtensions;
            _jwtHelper = jwtHelper;
            _userRepository = userRepository;
            _redisHelper = redisHelper;

        }

        public async Task<RefreshResponse> Handle(RefreshCommand request, CancellationToken cancellationToken)
        {
            var rs = _jwtHelper.ValidateToken(request.AccessToken);
            if (!rs.Item1)
            {
                return new RefreshResponse
                {
                    IsSuccess = false,
                    Message = rs.Item2
                };
            }

            //var RefreshToken = _sessionExtensions.Get<string>($"RT_{request.Id}");
            var RefreshToken = await _redisHelper.GetAsync<string>($"RT_{request.Id}");
            if(string.IsNullOrEmpty(RefreshToken))
            {
                return new RefreshResponse
                {
                    IsSuccess = false,
                    Message = "RefreshToken is used or expired!"
                };
            }
            else
            {
                var user = await _userRepository.GetAsync(new Query.User.UserGetQuery() { UserId = request.Id });
                //_sessionExtensions.Remove($"RT_{request.Id}");
                await _redisHelper.RemoveAsync($"RT_{request.Id}");
                return new RefreshResponse
                {
                    IsSuccess = true,
                    Message = "Refresh successfully!",
                    Data = new RefreshResponseDTO
                    {
                        AccessToken = _jwtHelper.GenerateAccessToken(user),
                        RefreshToken = _jwtHelper.GenerateRefreshToken(),
                    }
                };
                
            }

        }
    }
}
