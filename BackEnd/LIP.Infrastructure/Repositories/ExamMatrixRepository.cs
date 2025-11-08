using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories;

public class ExamMatrixRepository : IExamMatrixRepository
{
    private readonly ApplicationDbContext _dbContext;

    public ExamMatrixRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ExamMatrix?> GetAsync(ExamMatrixGetQuery query)
    {
        var matrix = _dbContext.ExamMatrices
            .AsNoTracking()
            .Include(em => em.GradeLevel)
            .Include(em => em.CreatedByNavigation)
            .Include(em => em.Exams)
            .Include(em => em.GradeLevel)
            .Include(em => em.Exammatrixdetails)
            .AsQueryable();
        //.Where(em => !em.IsDeleted)
        if (query.IsAdmin != true)
            matrix = matrix.Where(em => !em.IsDeleted);

        return await matrix.FirstOrDefaultAsync(em => em.MatrixId == query.MatrixId);
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
            //.Where(em => !em.IsDeleted)
            .AsQueryable();

        if (query.IsAdmin != true)
            matrixes = matrixes.Where(em => !em.IsDeleted);

        if (query.CreatedByUserId.HasValue)
            matrixes = matrixes.Where(em => em.CreatedByNavigationUserId == query.CreatedByUserId);

        if (query.GradeLevelId.HasValue) matrixes = matrixes.Where(em => em.GradeLevelId == query.GradeLevelId);
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
            Notes = command.Notes
        };

        _dbContext.ExamMatrices.Add(matrix);
        var rs = await _dbContext.SaveChangesAsync() > 0;
        if (rs)
        {
            //var currentMatrix = await _dbContext.ExamMatrices.FindAsync(command.CreatedByUserId);
            foreach (var detail in command.Details)
            {
                var matrixDetail = new ExamMatrixDetail
                {
                    LessonName = detail.LessonName,
                    QuestionType = detail.QuestionType,
                    Difficulty = detail.Difficulty,
                    Quantity = detail.Quantity,
                    ScorePerQuestion = detail.ScorePerQuestion,
                    ExamMatrixMatrixId = matrix.MatrixId
                };
                _dbContext.ExamMatrixDetails.Add(matrixDetail);
            }

            return await _dbContext.SaveChangesAsync() > 0;
        }

        return false;
    }

    public async Task<bool> UpdateAsync(ExamMatrixUpdateCommand command)
    {
        var matrix = await _dbContext.ExamMatrices
            .Include(m => m.Exammatrixdetails)
            .FirstOrDefaultAsync(m => m.MatrixId == command.MatrixId && !m.IsDeleted);

        if (matrix == null) return false;

        matrix.Title = command.Title;
        matrix.Description = command.Description;
        matrix.GradeLevelId = command.GradeLevelId;
        matrix.CreatedByNavigationUserId = command.CreatedByUserId;
        matrix.CreatedAt = command.CreatedAt;
        matrix.Status = command.Status;
        matrix.Notes = command.Notes;

        var requestDetailIds = command.Details
            .Where(d => d.ExamMatrixDetailId > 0)
            .Select(d => d.ExamMatrixDetailId)
            .ToList();

        // for deleting 
        var toDelete = matrix.Exammatrixdetails
            .Where(d => !requestDetailIds.Contains(d.ExamMatrixDetailId))
            .ToList();

        if (toDelete.Any()) _dbContext.ExamMatrixDetails.RemoveRange(toDelete);

        foreach (var detail in command.Details)
            //for updating
            if (detail.ExamMatrixDetailId > 0)
            {
                var existingDetail = matrix.Exammatrixdetails
                    .FirstOrDefault(d => d.ExamMatrixDetailId == detail.ExamMatrixDetailId);

                if (existingDetail != null)
                {
                    existingDetail.LessonName = detail.LessonName;
                    existingDetail.QuestionType = detail.QuestionType;
                    existingDetail.Difficulty = detail.Difficulty;
                    existingDetail.Quantity = detail.Quantity;
                    existingDetail.ScorePerQuestion = detail.ScorePerQuestion;
                }
            }
            else //for creating
            {
                var newDetail = new ExamMatrixDetail
                {
                    LessonName = detail.LessonName,
                    QuestionType = detail.QuestionType,
                    Difficulty = detail.Difficulty,
                    Quantity = detail.Quantity,
                    ScorePerQuestion = detail.ScorePerQuestion,
                    ExamMatrixMatrixId = matrix.MatrixId
                };
                _dbContext.ExamMatrixDetails.Add(newDetail);
            }

        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(ExamMatrixDeleteCommand command)
    {
        var matrix = await _dbContext.ExamMatrices.FindAsync(command.MatrixId);
        if (matrix == null) return false;

        matrix.IsDeleted = true;
        matrix.DeletedAt = DateTime.UtcNow;
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> RestoreAsync(ExamMatrixRestoreCommand command)
    {
        var matrix = await _dbContext.ExamMatrices.FindAsync(command.MatrixId);
        //    var matrix = await _dbContext.ExamMatrices
        //.IgnoreQueryFilters()
        //.FirstOrDefaultAsync(x => x.MatrixId == command.MatrixId);
        if (matrix == null) return false;

        matrix.IsDeleted = false;
        matrix.DeletedAt = DateTime.MinValue;
        return await _dbContext.SaveChangesAsync() > 0;
    }
}