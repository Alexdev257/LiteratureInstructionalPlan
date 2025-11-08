using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.CQRS.Query.ExamMatrixDetail;
using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface IExamMatrixDetailRepository
{
    Task<ExamMatrixDetail?> GetAsync(ExamMatrixDetailGetQuery query);
    Task<IEnumerable<ExamMatrixDetail>> GetAllAsync(ExamMatrixDetailGetAllQuery query);
    Task<bool> CreateAsync(ExamMatrixDetailCreateCommand command);
    Task<bool> UpdateAsync(ExamMatrixDetailUpdateCommand command);
    Task<bool> DeleteAsync(ExamMatrixDetailDeleteCommand command);
}