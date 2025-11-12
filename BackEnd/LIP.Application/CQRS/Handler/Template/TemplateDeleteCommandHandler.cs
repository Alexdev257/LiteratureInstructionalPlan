using LIP.Application.CQRS.Command.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateDeleteCommandHandler : IRequestHandler<TemplateDeleteCommand, bool>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateDeleteCommandHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<bool> Handle(TemplateDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _templateRepository.DeleteAsync(request);
        }
    }
}