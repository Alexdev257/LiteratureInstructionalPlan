using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.CQRS.Query.ExamMatrixDetail;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Infrastructure.Repositories
{
    public class ExamMatrixDetailRepository : IExamMatrixDetailRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ExamMatrixDetailRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ExamMatrixDetail?> GetAsync(ExamMatrixDetailGetQuery query)
        {
            return await _dbContext.ExamMatrixDetails
                .AsNoTracking()
                .Include(ed => ed.ExamMatrix)
                .FirstOrDefaultAsync(ed => ed.ExamMatrixDetailId == query.ExamMatrixDetailId);
        }
        public async Task<IEnumerable<ExamMatrixDetail>> GetAllAsync(ExamMatrixDetailGetAllQuery query)
        {
            var matrixDetail = _dbContext.ExamMatrixDetails
                .AsNoTracking()
                .Include(ed => ed.ExamMatrix)
                .AsQueryable();

            if(query.ExamMatricId.HasValue)
            {
                matrixDetail = matrixDetail.Where(ed => ed.ExamMatrixMatrixId == query.ExamMatricId);
            }
            return await matrixDetail.ToListAsync();
        }
        public async Task<bool> CreateAsync(ExamMatrixDetailCreateCommand command)
        {
            var matrixDetail = new ExamMatrixDetail
            {
                LessonName = command.LessonName,
                QuestionType = command.QuestionType,
                Difficulty = command.Difficulty,
                Quantity = command.Quantity,
                ScorePerQuestion = command.ScorePerQuestion,
                ExamMatrixMatrixId = command.ExamMatricId,
            };

            _dbContext.ExamMatrixDetails.Add(matrixDetail);
            return await _dbContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateAsync(ExamMatrixDetailUpdateCommand command)
        {
            //var matrixDetail = await _dbContext.ExamMatrixDetails.FindAsync(command.ExamMatrixDetailId);
            //if(matrixDetail == null)
            //{
            //    return false;
            //}

            //matrixDetail.LessonName = command.LessonName;
            //matrixDetail.QuestionType = command.QuestionType;
            //matrixDetail.Difficulty = command.Difficulty;
            //matrixDetail.Quantity = command.Quantity;
            //matrixDetail.ScorePerQuestion = command.ScorePerQuestion;
            //matrixDetail.ExamMatrixMatrixId = command.ExamMatricId;

            return await _dbContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteAsync(ExamMatrixDetailDeleteCommand command)
        {
            var matrixDetail = await _dbContext.ExamMatrixDetails.FindAsync(command.ExamMatrixDetailId);
            if(matrixDetail == null)
            {
                return false;
            }

            _dbContext.ExamMatrixDetails.Remove(matrixDetail);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
