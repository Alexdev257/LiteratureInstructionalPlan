//using LIP.Application.CQRS.Query.Bookseries;
//using LIP.Application.Interface.Repository;
//using LIP.Domain.Entities;
//using MediatR;

//namespace LIP.Application.CQRS.Handler.Bookseries
//{
//    public class BookseriesGetAllQueryHandler : IRequestHandler<BookseriesGetAllQuery, IEnumerable<LIP.Domain.Entities.Bookseries>>
//    {
//        private readonly IBookseriesRepository _bookseriesRepository;

//        public BookseriesGetAllQueryHandler(IBookseriesRepository bookseriesRepository)
//        {
//            _bookseriesRepository = bookseriesRepository;
//        }

//        public async Task<IEnumerable<LIP.Domain.Entities.Bookseries>> Handle(BookseriesGetAllQuery request, CancellationToken cancellationToken)
//        {
//            return await _bookseriesRepository.GetAllAsync(request);
//        }
//    }
//}