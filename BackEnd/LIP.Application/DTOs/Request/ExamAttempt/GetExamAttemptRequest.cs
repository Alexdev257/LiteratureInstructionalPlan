using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.ExamAttempt
{
    public class GetExamAttemptRequest
    {
        //public int AttemptId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}
