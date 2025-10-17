//using LIP.Application.CQRS.Command.Bookseries;
//using LIP.Application.CQRS.Query.Bookseries;
//using LIP.Application.Interface.Repository;
//using LIP.Domain.Entities;
//using LIP.Infrastructure.Persistency;
//using Microsoft.EntityFrameworkCore;

//namespace LIP.Infrastructure.Repositories
//{
//    public class BookseriesRepository : IBookseriesRepository
//    {
//        private readonly ApplicationDbContext _context;

//        public BookseriesRepository(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<Bookseries?> GetAsync(BookseriesGetQuery query)
//        {
//            return await _context.Bookseries
//                .AsNoTracking()
//                .Include(b => b.Exams)
//                .Include(b => b.Practicequestions)
//                .Include(b => b.Templates)
//                .Where(b => !b.IsDeleted)
//                .FirstOrDefaultAsync(b => b.SeriesId == query.SeriesId);
//        }

//        public async Task<IEnumerable<Bookseries>> GetAllAsync(BookseriesGetAllQuery query)
//        {
//            var bookseries = _context.Bookseries
//                .AsNoTracking()
//                .Where(b => !b.IsDeleted)
//                .AsQueryable();

//            if (!string.IsNullOrEmpty(query.Name))
//                bookseries = bookseries.Where(b => b.Name!.Contains(query.Name));

//            return await bookseries.ToListAsync();
//        }

//        public async Task<bool> CreateAsync(BookseriesCreateCommand command)
//        {
//            var bookseries = new Bookseries
//            {
//                Name = command.Name
//            };

//            _context.Bookseries.Add(bookseries);
//            await _context.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> UpdateAsync(BookseriesUpdateCommand command)
//        {
//            var bookseries = await _context.Bookseries.FindAsync(command.SeriesId);
//            if (bookseries == null || bookseries.IsDeleted) return false;

//            bookseries.Name = command.Name;

//            await _context.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> DeleteAsync(BookseriesDeleteCommand command)
//        {
//            var bookseries = await _context.Bookseries.FindAsync(command.SeriesId);
//            if (bookseries == null) return false;

//            bookseries.IsDeleted = true;
//            bookseries.DeletedAt = DateTime.UtcNow;
//            await _context.SaveChangesAsync();
//            return true;
//        }
//    }
//}