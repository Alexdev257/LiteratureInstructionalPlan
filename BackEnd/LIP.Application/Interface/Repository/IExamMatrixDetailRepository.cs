using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrixDetail;
using LIP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Repository
{
    public interface IExamMatrixDetailRepository
    {
        Task<ExamMatrixDetail?> GetAsync(ExamMatrixDetailGetQuery query);
        Task<IEnumerable<ExamMatrixDetail>> GetAllAsync(ExamMatrixDetailGetAllQuery query);
        Task<bool> CreateAsync(ExamMatrixDetailCreateCommand command);
        Task<bool> UpdateAsync(ExamMatrixDetailUpdateCommand command);
        Task<bool> DeleteAsync(ExamMatrixDetailDeleteCommand command);
    }
}
