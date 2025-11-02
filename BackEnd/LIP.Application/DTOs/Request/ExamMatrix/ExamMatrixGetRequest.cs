using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.ExamMatrix
{
    public class ExamMatrixGetRequest
    {
        public bool? IsAdmin { get; set; } = false;
    }
}
