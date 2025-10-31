using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Gradelevel
{
    public class GradelevelUpdateCommand : IRequest<GradeLevelUpdateResponse>, IValidatable<GradeLevelUpdateResponse>
    {
        public int GradeLevelId { get; set; }
        public string? Name { get; set; }

        public Task<GradeLevelUpdateResponse> ValidateAsync()
        {
            GradeLevelUpdateResponse response = new GradeLevelUpdateResponse();
            if (string.IsNullOrEmpty(this.GradeLevelId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId is not null or empty!"
                });
            }
            if (!Int32.TryParse(this.GradeLevelId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be an integer!"
                });
            }
            if (this.GradeLevelId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "GradeLevelId",
                    Detail = "GradeLevelId must be larger than 0!"
                });
            }
            if (string.IsNullOrEmpty(this.Name))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Name",
                    Detail = "Name is not null or empty!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}