using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeDeleteCommandHandler : IRequestHandler<ExamtypeDeleteCommand, ExamTypeDeleteResponse>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeDeleteCommandHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<ExamTypeDeleteResponse> Handle(ExamtypeDeleteCommand request, CancellationToken cancellationToken)
        {
            var check = await _examtypeRepository.GetAsync(new ExamtypeGetQuery { ExamTypeId = request.ExamTypeId });
            if (check == null)
            {
                return new ExamTypeDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Exam Type is not found!"
                };
            }
            var rs = await _examtypeRepository.DeleteAsync(request);
            if (rs)
            {
                return new ExamTypeDeleteResponse
                {
                    IsSuccess = true,
                    Message = "Delete Exam Type successfully!"
                };
            }
            else
            {
                return new ExamTypeDeleteResponse
                {
                    IsSuccess = false,
                    Message = "Delete Exam Type failed!"
                };
            }
        }

        //public async Task<bool> Handle(ExamtypeDeleteCommand request, CancellationToken cancellationToken)
        //{
        //    return await _examtypeRepository.DeleteAsync(request);
        //}
    }
}