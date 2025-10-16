//using LIP.Application.CQRS.Command.Bookseries;
//using LIP.Application.Interface.Repository;
//using MediatR;

//namespace LIP.Application.CQRS.Handler.Bookseries
//{
//    public class BookseriesCreateCommandHandler : IRequestHandler<BookseriesCreateCommand, bool>
//    {
//        private readonly IBookseriesRepository _bookseriesRepository;

//        public BookseriesCreateCommandHandler(IBookseriesRepository bookseriesRepository)
//        {
//            _bookseriesRepository = bookseriesRepository;
//        }

//        public async Task<bool> Handle(BookseriesCreateCommand request, CancellationToken cancellationToken)
//        {
//            return await _bookseriesRepository.CreateAsync(request);
//        }
//    }
//}