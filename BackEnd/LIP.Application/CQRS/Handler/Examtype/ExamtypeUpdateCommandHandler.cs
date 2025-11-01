using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeUpdateCommandHandler : IRequestHandler<ExamtypeUpdateCommand, ExamTypeUpdateResponse>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeUpdateCommandHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<ExamTypeUpdateResponse> Handle(ExamtypeUpdateCommand request, CancellationToken cancellationToken)
        {
            var check = await _examtypeRepository.GetAsync(new ExamtypeGetQuery { ExamTypeId = request.ExamTypeId });
            if (check == null)
            {
                return new ExamTypeUpdateResponse
                {
                    IsSuccess = false,
                    Message = "Exam Type is not found!"
                };
            }
            var rs = await _examtypeRepository.UpdateAsync(request);
            if (rs)
            {
                return new ExamTypeUpdateResponse
                {
                    IsSuccess = true,
                    Message = "Update Exam Type successfully!"
                };
            }
            else
            {
                return new ExamTypeUpdateResponse
                {
                    IsSuccess = false,
                    Message = "Update Exam Type failed"
                };
            }
        }

        //public async Task<bool> Handle(ExamtypeUpdateCommand request, CancellationToken cancellationToken)
        //{
        //    return await _examtypeRepository.UpdateAsync(request);
        //}
    }
}