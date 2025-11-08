using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface IExamMatrixRepository
{
    Task<ExamMatrix?> GetAsync(ExamMatrixGetQuery query);
    Task<IEnumerable<ExamMatrix>> GetAllAsync(ExamMatrixGetAllQuery query);
    Task<bool> CreateAsync(ExamMatrixCreateCommand command);
    Task<bool> UpdateAsync(ExamMatrixUpdateCommand command);
    Task<bool> DeleteAsync(ExamMatrixDeleteCommand command);
    Task<bool> RestoreAsync(ExamMatrixRestoreCommand command);
}