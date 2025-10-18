using LIP.Application.CQRS.Command.Templatebooking;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Domain.Enum;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories;

public class TemplatebookingRepository : ITemplatebookingRepository
{
    private readonly ApplicationDbContext _context;

    public TemplatebookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<Templatebooking?> GetAsync(TemplatebookingGetQuery query)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Templatebooking>> GetAllAsync(TemplatebookingGetAllQuery query)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Templatebooking>> GetByUserIdAsync(TemplatebookingGetByUserIdQuery query)
    {
        var result = await _context.Templatebookings.Where(x =>
            x.UserId == query.UserId &&
            x.Status == nameof(TemplateBookingEnum.Success) &&
            x.IsDeleted == false).ToListAsync();

        return result;
    }

    public Task<bool> CreateAsync(TemplatebookingCreateCommand command)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(TemplatebookingUpdateCommand command)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(TemplatebookingDeleteCommand command)
    {
        throw new NotImplementedException();
    }
}