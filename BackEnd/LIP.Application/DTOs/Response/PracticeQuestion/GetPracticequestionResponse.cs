using LIP.Application.DTOs.Request.PracticeQuestion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.PracticeQuestion
{
    public class GetPracticequestionResponse : CommonReponse<GetPracticequestionResponseDTO> { }

    public class GetPracticequestionResponseDTO
    {
        public int QuestionId { get; set; }

        public string? Content { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        //public string? Answer { get; set; }
        public List<AnswerOption>? Answer { get; set; }

        public int? GradeLevelId { get; set; }

        public int? CreatedByNavigationUserId { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
