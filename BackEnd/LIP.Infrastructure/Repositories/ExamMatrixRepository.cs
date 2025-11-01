using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Infrastructure.Repositories
{
    public class ExamMatrixRepository : IExamMatrixRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ExamMatrixRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ExamMatrix?> GetAsync(ExamMatrixGetQuery query)
        {
            return await _dbContext.ExamMatrices
                .AsNoTracking()
                .Include(em => em.GradeLevel)
                .Include(em => em.CreatedByNavigation)
                .Include(em => em.Exams)
                .Include(em => em.GradeLevel)
                .Include(em => em.Exammatrixdetails)
                .Where(em => !em.IsDeleted)
                .FirstOrDefaultAsync(em => em.MatrixId == query.MatrixId);

        }

        public async Task<IEnumerable<ExamMatrix>> GetAllAsync(ExamMatrixGetAllQuery query)
        {
            var matrixes = _dbContext.ExamMatrices
                .AsNoTracking()
                .Include(em => em.GradeLevel)
                .Include(em => em.CreatedByNavigation)
                .Include(em => em.Exams)
                .Include(em => em.GradeLevel)
                .Include(em => em.Exammatrixdetails)
                .Where(em => !em.IsDeleted)
                .AsQueryable();

            if (query.CreatedByUserId.HasValue)
            {
                matrixes = matrixes.Where(m => m.CreatedByNavigationUserId == query.CreatedByUserId);
            }

            if (query.GradeLevelId.HasValue)
            {
                matrixes = matrixes.Where(m => m.GradeLevelId == query.GradeLevelId);
            }
            return await matrixes.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamMatrixCreateCommand command)
        {
            var matrix = new ExamMatrix
            {
                Title = command.Title,
                Description = command.Description,
                GradeLevelId = command.GradeLevelId,
                CreatedByNavigationUserId = command.CreatedByUserId,
                CreatedAt = command.CreatedAt,
                Status = command.Status,
                Notes = command.Notes,
            };

            _dbContext.Add(matrix);
            return await _dbContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateAsync(ExamMatrixUpdateCommand command)
        {
            var matrix = await _dbContext.ExamMatrices.FindAsync(command.MatrixId);
            if (matrix == null || matrix.IsDeleted)
            {
                return false;
            }

            matrix.Title = command.Title;
            matrix.Description = command.Description;
            matrix.GradeLevelId = command.GradeLevelId;
            matrix.CreatedByNavigationUserId = command.CreatedByUserId;
            matrix.CreatedAt = command.CreatedAt;
            matrix.Status = command.Status;
            matrix.Notes = command.Notes;

            return await _dbContext.SaveChangesAsync() > 0;

        }
        public async Task<bool> DeleteAsync(ExamMatrixDeleteCommand command)
        {
            var matrix = await _dbContext.ExamMatrices.FindAsync(command.MatrixId);
            if(matrix == null)
            {
                return false;
            }

            matrix.IsDeleted = true;
            matrix.DeletedAt = DateTime.UtcNow;
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
