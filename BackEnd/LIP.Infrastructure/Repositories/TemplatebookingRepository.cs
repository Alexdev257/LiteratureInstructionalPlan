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

    public async Task<TemplateOrder?> GetAsync(TemplatebookingGetQuery query)
    {
        return await _context.TemplateOrders.FindAsync(query.TemplatebookingId);
    }

    public Task<IEnumerable<TemplateOrder>> GetAllAsync(TemplatebookingGetAllQuery query)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<TemplateOrder>> GetByUserIdAsync(TemplatebookingGetByUserIdQuery query)
    {
        var result = await _context.TemplateOrders.Where(x =>
            x.UserId == query.UserId &&
            x.Status == nameof(TemplateBookingEnum.Success) &&
            x.IsDeleted == false).ToListAsync();

        return result;
    }

    public async Task<TemplateOrder> CreateAsync(TemplatebookingCreateCommand command)
    {
        var newTemplateOrder = new TemplateOrder
        {
            TemplateId = command.TemplateId,
            UserId = command.UserId,
            Status = nameof(TemplateBookingEnum.Pending),
            BookingDate = DateTime.Now
        };

        _context.TemplateOrders.Add(newTemplateOrder);
        var result = await _context.SaveChangesAsync();

        return result > 0 ? newTemplateOrder : null!;
    }

    public async Task<TemplateOrder> UpdateAsync(TemplateOrder order)
    {
        _context.TemplateOrders.Update(order);
        var result = await _context.SaveChangesAsync();
        return result > 0 ? order : null!;
    }

    public Task<bool> DeleteAsync(TemplatebookingDeleteCommand command)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<TemplateOrder>> GetByTemplateIdAsync(int templateId)
    {
        return await _context.TemplateOrders
            .Include(o => o.User)
            .Include(h => h.Template)
            .ThenInclude(hi => hi!.GradeLevel)
            .Where(x => x.TemplateId == templateId && x.Status == nameof(TemplateBookingEnum.Success)).ToListAsync();
    }
}