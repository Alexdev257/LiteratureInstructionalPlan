using LIP.Application.CQRS.Command.Bookseries;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Bookseries
{
    public class BookseriesDeleteCommandHandler : IRequestHandler<BookseriesDeleteCommand, bool>
    {
        private readonly IBookseriesRepository _bookseriesRepository;

        public BookseriesDeleteCommandHandler(IBookseriesRepository bookseriesRepository)
        {
            _bookseriesRepository = bookseriesRepository;
        }

        public async Task<bool> Handle(BookseriesDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _bookseriesRepository.DeleteAsync(request);
        }
    }
}