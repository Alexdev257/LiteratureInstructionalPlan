using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype;

public class ExamtypeCreateCommandHandler : IRequestHandler<ExamtypeCreateCommand, ExamTypeCreatResponse>
{
    private readonly IExamtypeRepository _examtypeRepository;

    public ExamtypeCreateCommandHandler(IExamtypeRepository examtypeRepository)
    {
        _examtypeRepository = examtypeRepository;
    }

    public async Task<ExamTypeCreatResponse> Handle(ExamtypeCreateCommand request, CancellationToken cancellationToken)
    {
        var examtypeList = await _examtypeRepository.GetAllAsync(new ExamtypeGetAllQuery { Name = request.Name });
        var check = examtypeList.ToList().FirstOrDefault();
        if (check != null)
            return new ExamTypeCreatResponse
            {
                IsSuccess = false,
                Message = "Exam Type name already exists!"
            };
        var rs = await _examtypeRepository.CreateAsync(request);
        if (rs)
            return new ExamTypeCreatResponse
            {
                IsSuccess = true,
                Message = "Create Exam Type successfully!"
            };

        return new ExamTypeCreatResponse
        {
            IsSuccess = false,
            Message = "Create Exam Type failed"
        };
    }

    //public async Task<bool> Handle(ExamtypeCreateCommand request, CancellationToken cancellationToken)
    //{
    //    return await _examtypeRepository.CreateAsync(request);
    //}
}