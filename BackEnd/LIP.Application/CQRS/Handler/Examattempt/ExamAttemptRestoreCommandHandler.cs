using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Examattempt
{
    public class ExamAttemptRestoreCommandHandler : IRequestHandler<ExamattemptRestoreCommand, ExamAttemptRestoreResponse>
    {
        private readonly IExamattemptRepository _examattemptRepository;
        public ExamAttemptRestoreCommandHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }
        public async Task<ExamAttemptRestoreResponse> Handle(ExamattemptRestoreCommand request, CancellationToken cancellationToken)
        {
            var attempt = await _examattemptRepository.GetAsync(new ExamattemptGetQuery { AttemptId = request.AttemptId, IsAdmin = true });

            if (attempt == null)
            {
                return new ExamAttemptRestoreResponse
                {
                    IsSuccess = false,
                    Message = "Attempt is not found!"
                };
            }

            var rs = await _examattemptRepository.RestoreAsync(request);
            if (rs)
            {
                return new ExamAttemptRestoreResponse
                {
                    IsSuccess = true,
                    Message = "Restore Attempt successfully!"
                };
            }
            else
            {
                return new ExamAttemptRestoreResponse
                {
                    IsSuccess = false,
                    Message = "Restore Attempt failed!"
                };
            }
        }
    }
}
