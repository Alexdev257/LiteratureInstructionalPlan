using LIP.Application.CQRS.Command.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateUpdateCommandHandler : IRequestHandler<TemplateUpdateCommand, bool>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateUpdateCommandHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<bool> Handle(TemplateUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _templateRepository.UpdateAsync(request);
        }
    }
}