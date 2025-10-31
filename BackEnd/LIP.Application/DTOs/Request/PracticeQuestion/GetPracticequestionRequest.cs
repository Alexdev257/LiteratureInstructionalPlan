using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.PracticeQuestion
{
    public class GetPracticequestionRequest
    {
        //public int QuestionId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}
