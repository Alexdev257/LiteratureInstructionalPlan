using LIP.Application.CQRS.Command.Template;
using LIP.Application.CQRS.Query.Template;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
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
                .Include(t => t.CreatedByNavigation)
                .Include(t => t.GradeLevel)
                .Include(t => t.Series)
                .FirstOrDefaultAsync(t => t.TemplateId == query.TemplateId);
        }

        public async Task<IEnumerable<Template>> GetAllAsync(TemplateGetAllQuery query)
        {
            var templates = _context.Templates
                .Include(t => t.CreatedByNavigation)
                .Include(t => t.GradeLevel)
                .Include(t => t.Series)
                .AsQueryable();

            if (query.GradeLevelId.HasValue)
                templates = templates.Where(t => t.GradeLevelId == query.GradeLevelId);

            if (query.SeriesId.HasValue)
                templates = templates.Where(t => t.SeriesId == query.SeriesId);

            if (query.CreatedBy.HasValue)
                templates = templates.Where(t => t.CreatedBy == query.CreatedBy);

            return await templates.ToListAsync();
        }

        public async Task<bool> CreateAsync(TemplateCreateCommand command)
        {
            var template = new Template
            {
                Title = command.Title,
                FilePath = command.FilePath,
                GradeLevelId = command.GradeLevelId,
                SeriesId = command.SeriesId,
                CreatedBy = command.CreatedBy,
                CreatedAt = command.CreatedAt
            };

            _context.Templates.Add(template);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(TemplateUpdateCommand command)
        {
            var template = await _context.Templates.FindAsync(command.TemplateId);
            if (template == null) return false;

            template.Title = command.Title;
            template.FilePath = command.FilePath;
            template.GradeLevelId = command.GradeLevelId;
            template.SeriesId = command.SeriesId;
            template.CreatedBy = command.CreatedBy;
            template.CreatedAt = command.CreatedAt;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(TemplateDeleteCommand command)
        {
            var template = await _context.Templates.FindAsync(command.TemplateId);
            if (template == null) return false;

            _context.Templates.Remove(template);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}