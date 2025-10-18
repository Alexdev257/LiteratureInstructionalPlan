using LIP.Application.CQRS.Command.Templatebooking;
using LIP.Application.CQRS.Query.Templatebooking;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;

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

    public Task<IEnumerable<Templatebooking>> GetByUserIdAsync(TemplatebookingGetByUserIdQuery query)
    {
        throw new NotImplementedException();
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