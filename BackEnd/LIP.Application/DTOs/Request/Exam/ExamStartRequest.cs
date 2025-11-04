using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Exam
{
    public class ExamStartRequest
    {
        public int ExamId { get; set; }

        public int UserId { get; set; }
    }
}
