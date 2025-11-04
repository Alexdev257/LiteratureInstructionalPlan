using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.ExamAttempt
{
    public class GetExamAttemptResponse : CommonReponse<GetExamAttemptResponseDTO> { }

    public class GetExamAttemptResponseDTO
    {
        public int AttemptId { get; set; }

        public int? ExamId { get; set; }

        public int? UserId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public string? Status { get; set; }

        public decimal? Score { get; set; }

        public string? Feedback { get; set; }

        public DateTime? LastSavedAt { get; set; }
    }
}
