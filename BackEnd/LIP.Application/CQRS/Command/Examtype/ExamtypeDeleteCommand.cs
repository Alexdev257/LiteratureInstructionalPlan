using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Examtype
{
    public class ExamtypeDeleteCommand : IRequest<ExamTypeDeleteResponse>, IValidatable<ExamTypeDeleteResponse>
    {
        public int ExamTypeId { get; set; }

        public Task<ExamTypeDeleteResponse> ValidateAsync()
        {
            ExamTypeDeleteResponse response = new ExamTypeDeleteResponse();
            if (string.IsNullOrEmpty(this.ExamTypeId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.ExamTypeId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId must be an integer!"
                });
            }
            if (this.ExamTypeId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamTypeId",
                    Detail = "ExamTypeId must be larger than 0!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}