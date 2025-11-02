using LIP.Application.CQRS.Command.ExamMatrix;
using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.DTOs.Request.ExamMatrix;
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
    public class ExamMatrixCreateCommandHandler : IRequestHandler<ExamMatrixCreateCommand, ExamMatrixCreateResponse>
    {
        private readonly IExamMatrixRepository _examMatrixRepository;
        private readonly IExamMatrixDetailRepository _examMatrixDetailRepository;
        public ExamMatrixCreateCommandHandler(IExamMatrixRepository examMatrixRepository, IExamMatrixDetailRepository examMatrixDetailRepository)
        {
            _examMatrixRepository = examMatrixRepository;
            _examMatrixDetailRepository = examMatrixDetailRepository;
        }

        public async Task<ExamMatrixCreateResponse> Handle(ExamMatrixCreateCommand request, CancellationToken cancellationToken)
        {
            var rs = await _examMatrixRepository.CreateAsync(request);
            if (rs)
            {
                return new ExamMatrixCreateResponse
                {
                    IsSuccess = true,
                    Message = "Create Exam Matrix successfully!"
                };
            }
            else
            {
                return new ExamMatrixCreateResponse
                {
                    IsSuccess = false,
                    Message = "Create Exam Matrix failed!"
                };
            }
        }
    }
}
