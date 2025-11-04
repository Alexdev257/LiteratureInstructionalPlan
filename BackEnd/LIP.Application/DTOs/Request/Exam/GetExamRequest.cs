using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.Exam
{
    public class GetExamRequest
    {
        public bool? IsAdmin { get; set; } = false!;
        public bool? IsShowCorrectAnswer { get; set; } = false!;
    }
}
