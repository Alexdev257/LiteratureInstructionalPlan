using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Query.ExamMatrix;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.ExamMatrix
{
    public class ExamMatrixDeleteCommandHandler : IRequestHandler<ExamMatrixDeleteCommand, ExamMatrixDeleteResponse>
    {
        private readonly IExamMatrixRepository _examMatrixRepository;
        public ExamMatrixDeleteCommandHandler(IExamMatrixRepository examMatrixRepository)
        {
            _examMatrixRepository = examMatrixRepository;
        }
        public async Task<ExamMatrixDeleteResponse> Handle(ExamMatrixDeleteCommand request, CancellationToken cancellationToken)
        {
            var check = await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery { MatrixId = request.MatrixId });
            if (check == null)
            {
                return new ExamMatrixDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Matrix is not exist in the system!"
                };
            }

            var rs = await _examMatrixRepository.DeleteAsync(request);
            if (rs)
            {
                return new ExamMatrixDeleteResponse
                {
                    IsSuccess = true,
                    Message = "Delete Matrix successfully!"
                };
            }
            else
            {
                return new ExamMatrixDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Delete Matrix failed!"
                };
            }
        }
    }
}
