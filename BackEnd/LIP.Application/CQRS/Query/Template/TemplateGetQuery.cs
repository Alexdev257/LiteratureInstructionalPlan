using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Validation;
using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Template
{
    public class TemplateGetQuery : IRequest<TemplateGetByIdResponse>, IValidatable<TemplateGetResponse>
    {
        public int TemplateId { get; set; }
        public Task<TemplateGetResponse> ValidateAsync()
        {
            var response = new TemplateGetResponse();
            if (TemplateId <= 0)
            {
                response.IsSuccess = false;
                response.ListErrors.Add(new Errors
                {
                    Field = "TemplateId",
                    Detail = "TemplateId must be greater than zero."
                });
            }
            return Task.FromResult(response);
        }
    }
}