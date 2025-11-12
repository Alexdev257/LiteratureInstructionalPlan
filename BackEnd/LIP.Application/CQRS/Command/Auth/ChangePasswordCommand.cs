using System.Text.RegularExpressions;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class ChangePasswordCommand : IRequest<ChangePasswordResponse>, IValidatable<ChangePasswordResponse>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string NewPassword { get; set; } = null!;

    public Task<ChangePasswordResponse> ValidateAsync()
    {
        ChangePasswordResponse response = new();
        if (string.IsNullOrEmpty(Email))
            response.ListErrors.Add(new Errors
            {
                Field = "Email",
                Detail = "Email is not null or empty"
            });
        if (string.IsNullOrEmpty(Password))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password is not null or empty"
            });
        if (string.IsNullOrEmpty(NewPassword))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password is not null or empty"
            });
        if (!Regex.IsMatch(Email, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
            response.ListErrors.Add(new Errors
            {
                Field = "Email",
                Detail = "Email is not valid!"
            });

        if (NewPassword.Length < 8)
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must be at least 8 characters!"
            });

        if (!Regex.IsMatch(NewPassword, @"^(?=.*[A-Z]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 Upper character!"
            });
        if (!Regex.IsMatch(NewPassword, @"^(?=.*[a-z]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 Lower character!"
            });
        if (!Regex.IsMatch(NewPassword, @"^(?=.*[\d]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 digit!"
            });
        if (!Regex.IsMatch(NewPassword, @"^(?=.*[!@#$%^&*(),.?"":{}|<>]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 special character(!@#$%^&*(),.?\":{}|<>)!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}