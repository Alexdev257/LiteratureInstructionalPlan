﻿using LIP.Application.DTOs.Response.Auth;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Auth
{
    public class LoginGoogleCommand : IRequest<LoginGoogleResponse>, IValidatable<LoginGoogleResponse>
    {
        public string GoogleToken { get; set; } = null!;

        public Task<LoginGoogleResponse> ValidateAsync()
        {
            LoginGoogleResponse response = new LoginGoogleResponse();
            if (string.IsNullOrEmpty(this.GoogleToken))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GoogleToken",
                    Detail = "GoogleToken is null or empty"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
