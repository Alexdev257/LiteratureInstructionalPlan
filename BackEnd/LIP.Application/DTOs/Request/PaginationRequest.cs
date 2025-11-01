using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request
{
    public class PaginationRequest
    {
        private const int MaxPageSize = 100;

        private int _pageSize = 10;
        private int _pageNumber = 1;

        public int PageNumber
        {
            get => _pageNumber;
            set => _pageNumber = (value <= 0) ? 1 : value;
        }

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value <= 0) ? 10 : Math.Min(value, MaxPageSize);
        }
    }
}
