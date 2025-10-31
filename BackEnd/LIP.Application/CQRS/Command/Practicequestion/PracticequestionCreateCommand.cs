using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Practicequestion
{
    public class PracticequestionCreateCommand : IRequest<PracticeQuestionCreateResponse>, IValidatable<PracticeQuestionCreateResponse>
    {
        //public string? Content { get; set; }
        //public string? QuestionType { get; set; }
        //public string? Answer { get; set; }
        //public int? GradeLevelId { get; set; }
        //public int? SeriesId { get; set; }
        //public int? CreatedBy { get; set; }
        //public DateTime? CreatedAt { get; set; }


        //public int QuestionId { get; set; }

        public string? Content { get; set; }

        public string? QuestionType { get; set; }

        public string? Difficulty { get; set; }

        public string? Answer { get; set; }

        public int? GradeLevelId { get; set; }

        public int? CreatedByUserId { get; set; }

        public DateTime? CreatedAt { get; set; }

        //public bool IsDeleted { get; set; }

        //public DateTime DeletedAt { get; set; }

        public Task<PracticeQuestionCreateResponse> ValidateAsync()
        {
            PracticeQuestionCreateResponse response = new PracticeQuestionCreateResponse();
            if (string.IsNullOrEmpty(this.Content))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Content",
                    Detail = "Content is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.QuestionType))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "QuestionType",
                    Detail = "QuestionType is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.Difficulty))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Difficulty",
                    Detail = "Difficulty is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.Answer))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Answer",
                    Detail = "Answer is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.GradeLevelId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.CreatedByUserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedBy",
                    Detail = "CreatedBy is null or empty"
                });
            }
            //if (string.IsNullOrEmpty(this.CreatedAt.ToString()))
            //{
            //    response.ListErrors.Add(new Errors
            //    {
            //        Field = "CreatedAt",
            //        Detail = "CreatedAt is null or empty"
            //    });
            //}
            if (!Int32.TryParse(this.GradeLevelId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be an integer!"
                });
            }
            if (!Int32.TryParse(this.CreatedByUserId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedBy",
                    Detail = "CreatedBy must be an integer!"
                });
            }
            //if(!DateTime.TryParse(this.CreatedAt.ToString(), out var _))
            //{
            //    response.ListErrors.Add(new Errors
            //    {
            //        Field = "CreatedAt",
            //        Detail = "CreatedAt must be a valid date time!"
            //    });
            //}
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}