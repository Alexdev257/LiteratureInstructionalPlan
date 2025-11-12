using System.Text.RegularExpressions;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class RegisterCommand : IRequest<RegisterResponse>, IValidatable<RegisterResponse>
{
    public string UserName { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public Task<RegisterResponse> ValidateAsync()
    {
        RegisterResponse response = new();
        if (string.IsNullOrEmpty(UserName))
            response.ListErrors.Add(new Errors
            {
                Field = "Username",
                Detail = "Username is null or empty"
            });
        if (string.IsNullOrEmpty(FullName))
            response.ListErrors.Add(new Errors
            {
                Field = "Fullname",
                Detail = "Fullname is null or empty"
            });
        if (string.IsNullOrEmpty(Email))
            response.ListErrors.Add(new Errors
            {
                Field = "Email",
                Detail = "Email is null or empty"
            });
        if (string.IsNullOrEmpty(Password))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password is null or empty"
            });

        if (!Regex.IsMatch(UserName, @"([a-zA-Z\d]+)"))
            response.ListErrors.Add(new Errors
            {
                Field = "Username",
                Detail = "Username is not allowed special characters!"
            });

        if (!Regex.IsMatch(FullName, @"([a-zA-Z\s]+)"))
            response.ListErrors.Add(new Errors
            {
                Field = "Fullname",
                Detail = "Fullname is not allowed special characters and digits!"
            });
        if (!Regex.IsMatch(Email, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
            response.ListErrors.Add(new Errors
            {
                Field = "Email",
                Detail = "Email is not valid!"
            });

        if (Password.Length < 8)
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must be at least 8 characters!"
            });

        if (!Regex.IsMatch(Password, @"^(?=.*[A-Z]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 Upper character!"
            });
        if (!Regex.IsMatch(Password, @"^(?=.*[a-z]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 Lower character!"
            });
        if (!Regex.IsMatch(Password, @"^(?=.*[\d]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 digit!"
            });
        if (!Regex.IsMatch(Password, @"^(?=.*[!@#$%^&*(),.?"":{}|<>]).+$"))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password must contain at least 1 special character(!@#$%^&*(),.?\":{}|<>)!"
            });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;

        return Task.FromResult(response);
    }
}