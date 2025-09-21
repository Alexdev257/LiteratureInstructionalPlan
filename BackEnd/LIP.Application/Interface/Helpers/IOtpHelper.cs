using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Helpers
{
    public interface IOtpHelper
    {
        string GenerateOtpAsync(int length);
    }
}
