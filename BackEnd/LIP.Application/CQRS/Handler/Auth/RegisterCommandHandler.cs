using LIP.Application.CQRS.Command.Auth;
using LIP.Application.Interface.Helpers;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Auth
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly IUserRepository _userRepository;
        private readonly IBcryptHelper _bcryptHelper;
        public RegisterCommandHandler(IUserRepository userRepository, IBcryptHelper bcryptHelper)
        {
            _userRepository = userRepository;
            _bcryptHelper = bcryptHelper;
        }
        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            //check empty fields
            if (string.IsNullOrEmpty(request.UserName))
            {
                Console.WriteLine("Username is required!");
                return false;
            }
            if (string.IsNullOrEmpty(request.FullName))
            {
                Console.WriteLine("Fullname is required!");
                return false;
            }
            if (string.IsNullOrEmpty(request.Email))
            {
                Console.WriteLine("Email is required!");
                return false;
            }
            if (string.IsNullOrEmpty(request.Password))
            {
                Console.WriteLine("Email is required!");
                return false;
            }

            if(!Regex.IsMatch(request.UserName, @"([a-zA-Z\d]+)"))
            {
                Console.WriteLine("Username is not allowed specail characters!");
                return false;
            }

            if (!Regex.IsMatch(request.FullName, @"([a-zA-Z\s]+)"))
            {
                Console.WriteLine("Fullname is not allowed special characters and digits!");
                return false;
            }

            if (!Regex.IsMatch(request.Email, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
            {
                Console.WriteLine("Email is not valid!");
                return false;
            }
            var hashedPassword = _bcryptHelper.HashPassword(request.Password);
            var user = new LIP.Domain.Entities.User
            {
                UserName = request.UserName,
                FullName = request.FullName,
                Email = request.Email,
                Password = hashedPassword,
                RoleId = 1,
                CreatedAt = DateTime.UtcNow
            };
            return await _userRepository.RegisterAsync(user);
        }
    }
}
