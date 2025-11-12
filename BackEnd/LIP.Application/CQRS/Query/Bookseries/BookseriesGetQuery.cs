using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Bookseries
{
    public class BookseriesGetQuery : IRequest<LIP.Domain.Entities.Bookseries?>
    {
        public int SeriesId { get; set; }
    }
}