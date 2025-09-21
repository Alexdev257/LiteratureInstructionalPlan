using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Helpers
{
    public interface ISessionExtensions
    {
        void Set<T>(string key, T value);
        T? Get<T>(string key);
        void Remove(string key);
    }
}
