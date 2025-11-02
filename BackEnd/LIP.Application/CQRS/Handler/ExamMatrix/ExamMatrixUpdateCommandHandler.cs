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
    public class ExamMatrixUpdateCommandHandler : IRequestHandler<ExamMatrixUpdateCommand, ExamMatrixUpdateResponse>
    {
        private readonly IExamMatrixRepository _examMatrixRepository;
        public ExamMatrixUpdateCommandHandler(IExamMatrixRepository examMatrixRepository)
        {
            _examMatrixRepository = examMatrixRepository;
        }
        public async Task<ExamMatrixUpdateResponse> Handle(ExamMatrixUpdateCommand request, CancellationToken cancellationToken)
        {
            var check = await _examMatrixRepository.GetAsync(new ExamMatrixGetQuery { MatrixId = request.MatrixId });
            var rs = await _examMatrixRepository.UpdateAsync(request);
            if (rs)
            {
                return new ExamMatrixUpdateResponse
                {
                    IsSuccess = true,
                    Message = "Update Exam Matrix successfully!"
                };
            }
            else
            {
                return new ExamMatrixUpdateResponse
                {
                    IsSuccess = false,
                    Message = "Update Exam Matrix failed!"
                };
            }
        }
    }
}
