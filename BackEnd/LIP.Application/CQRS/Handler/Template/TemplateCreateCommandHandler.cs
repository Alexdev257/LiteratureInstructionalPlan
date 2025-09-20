using LIP.Application.CQRS.Command.Template;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Template
{
    public class TemplateCreateCommandHandler : IRequestHandler<TemplateCreateCommand, bool>
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateCreateCommandHandler(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task<bool> Handle(TemplateCreateCommand request, CancellationToken cancellationToken)
        {
            return await _templateRepository.CreateAsync(request);
        }
    }
}