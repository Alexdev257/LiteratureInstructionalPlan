using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories;

public class TemplateRepository : ITemplateRepository
{
    private readonly ApplicationDbContext _context;

    public TemplateRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Template?> GetAsync(TemplateGetQuery query)
    {
        return await _context.Templates
            .AsNoTracking()
            .Include(t => t.CreatedByNavigation)
            .Include(t => t.GradeLevel)
            //.Include(t => t.Series)
            .Where(t => !t.IsDeleted)
            .FirstOrDefaultAsync(t => t.TemplateId == query.TemplateId);
    }

    public async Task<IEnumerable<Template>> GetAllAsync(TemplateGetAllQuery query)
    {
        var templates = _context.Templates
            .AsNoTracking()
            .Include(t => t.CreatedByNavigation)
            .Include(t => t.GradeLevel)
            .Where(t => !t.IsDeleted)
            .AsQueryable();

        if (!string.IsNullOrEmpty(query.Search))
            templates = templates.Where(t => t.Title.ToLower().Contains(query.Search.ToLower()));

        return await templates.ToListAsync();
    }

    public async Task<bool> CreateAsync(TemplateCreateCommand command)
    {
        var template = new Template
        {
            Title = command.Title,
            FilePath = command.FilePath,
            ViewPath = command.ViewPath,
            GradeLevelId = command.GradeLevelId,
            Price = (float)command.Price!,
            CreatedBy = command.CreatedBy,
            CreatedAt = command.CreatedAt
        };

        _context.Templates.Add(template);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(TemplateDeleteCommand command)
    {
        var template = await _context.Templates.FindAsync(command.TemplateId);
        if (template == null) return false;

        template.IsDeleted = true;
        template.DeletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Template>> GetTemplateByUserIdAsync(TemplateGetByUserId query)
    {
        var result = await _context.Templates.AsNoTracking()
            .Include(g => g.GradeLevel)
            .Include(c => c.CreatedByNavigation)
            .Where(t => !t.IsDeleted && t.CreatedBy == query.UserId)
            .ToListAsync();

        return result;
    }

    public async Task<List<Template>> GetByIdsAsync(List<int>? templateIds)
    {
        if (templateIds == null || !templateIds.Any()) return new List<Template>();

        return await _context.Templates
            .Where(t => templateIds.Contains(t.TemplateId))
            .Include(g => g.GradeLevel)
            .Include(o => o.CreatedByNavigation)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<bool> UpdateAsync(TemplateUpdateCommand command)
    {
        var template = await _context.Templates.FindAsync(command.TemplateId);
        if (template == null || template.IsDeleted) return false;

        template.Title = command.Title;
        template.FilePath = command.FilePath;
        template.GradeLevelId = command.GradeLevelId;
        template.ViewPath = command.ViewPath;
        template.Price = (float)command.Price!;


        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RestoreAsync(TemplateRestoreCommand command)
    {
        var template = await _context.Templates.FindAsync(command.TemplateId);
        if (template is not { IsDeleted: true }) return false;

        template.IsDeleted = false;
        await _context.SaveChangesAsync();
        return true;
    }
}