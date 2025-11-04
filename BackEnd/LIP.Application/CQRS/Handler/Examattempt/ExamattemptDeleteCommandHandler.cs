using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examattempt
{
    public class ExamattemptDeleteCommandHandler : IRequestHandler<ExamattemptDeleteCommand, ExamAttemptDeleteResponse>
    {
        private readonly IExamattemptRepository _examattemptRepository;

        public ExamattemptDeleteCommandHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }

        public async Task<ExamAttemptDeleteResponse> Handle(ExamattemptDeleteCommand request, CancellationToken cancellationToken)
        {
            var attempt = await _examattemptRepository.GetAsync(new ExamattemptGetQuery { AttemptId = request.AttemptId });
            if (attempt == null)
            {
                return new ExamAttemptDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Attempt is not found!"
                };
            }

            var rs = await _examattemptRepository.DeleteAsync(request);
            if (rs)
            {
                return new ExamAttemptDeleteResponse
                {
                    IsSuccess = true,
                    Message = "Delete Attempt successfully!"
                };
            }
            else
            {
                return new ExamAttemptDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Delete Attempt failed!"
                };
            }
        }

        //public async Task<bool> Handle(ExamattemptDeleteCommand request, CancellationToken cancellationToken)
        //{
        //    return await _examattemptRepository.DeleteAsync(request);
        //}
    }
}