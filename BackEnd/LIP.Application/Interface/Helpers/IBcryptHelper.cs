using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Helpers
{
    public interface IBcryptHelper
    {
        public string HashPassword(string password);
        public bool VerifyPassword(string password, string hashedPassword);
    }
}
