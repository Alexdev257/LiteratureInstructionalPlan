//using LIP.Application.CQRS.Query.Bookseries;
//using LIP.Application.Interface.Repository;
//using LIP.Domain.Entities;
//using MediatR;

//namespace LIP.Application.CQRS.Handler.Bookseries
//{
//    public class BookseriesGetQueryHandler : IRequestHandler<BookseriesGetQuery, LIP.Domain.Entities.Bookseries?>
//    {
//        private readonly IBookseriesRepository _bookseriesRepository;

//        public BookseriesGetQueryHandler(IBookseriesRepository bookseriesRepository)
//        {
//            _bookseriesRepository = bookseriesRepository;
//        }

//        public async Task<LIP.Domain.Entities.Bookseries?> Handle(BookseriesGetQuery request, CancellationToken cancellationToken)
//        {
//            return await _bookseriesRepository.GetAsync(request);
//        }
//    }
//}