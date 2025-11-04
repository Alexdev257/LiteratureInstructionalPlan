using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.ExamAttempt
{
    public class GetAllExamAttemptRequest : PaginationRequest
    {
        public int? ExamId { get; set; }
        public int? UserId { get; set; }
        public string? Status { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}
