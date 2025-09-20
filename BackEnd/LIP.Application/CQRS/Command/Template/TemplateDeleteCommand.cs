using MediatR;

namespace LIP.Application.CQRS.Command.Template
{
    public class TemplateDeleteCommand : IRequest<bool>
    {
        public int TemplateId { get; set; }
    }
}