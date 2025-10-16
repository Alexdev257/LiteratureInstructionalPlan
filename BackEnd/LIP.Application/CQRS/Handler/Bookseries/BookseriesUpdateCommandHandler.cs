//using LIP.Application.CQRS.Command.Bookseries;
//using LIP.Application.Interface.Repository;
//using MediatR;

//namespace LIP.Application.CQRS.Handler.Bookseries
//{
//    public class BookseriesUpdateCommandHandler : IRequestHandler<BookseriesUpdateCommand, bool>
//    {
//        private readonly IBookseriesRepository _bookseriesRepository;

//        public BookseriesUpdateCommandHandler(IBookseriesRepository bookseriesRepository)
//        {
//            _bookseriesRepository = bookseriesRepository;
//        }

//        public async Task<bool> Handle(BookseriesUpdateCommand request, CancellationToken cancellationToken)
//        {
//            return await _bookseriesRepository.UpdateAsync(request);
//        }
//    }
//}