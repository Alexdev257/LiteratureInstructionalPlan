using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.Interface.Repository
{
    public interface IExamMatrixRepository
    {
        Task<ExamMatrix?> GetAsync(ExamMatrixGetQuery query);
        Task<IEnumerable<ExamMatrix>> GetAllAsync(ExamMatrixGetAllQuery query);
        Task<bool> CreateAsync(ExamMatrixCreateCommand command);
        Task<bool> UpdateAsync(ExamMatrixUpdateCommand command);
        Task<bool> DeleteAsync(ExamMatrixDeleteCommand command);
    }
}
