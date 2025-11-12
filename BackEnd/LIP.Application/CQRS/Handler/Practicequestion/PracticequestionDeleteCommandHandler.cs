using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class
    PracticequestionDeleteCommandHandler : IRequestHandler<PracticequestionDeleteCommand,
    PracticeQuestionDeleteResponse>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public PracticequestionDeleteCommandHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<PracticeQuestionDeleteResponse> Handle(PracticequestionDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var question = await _practicequestionRepository.GetAsync(new PracticequestionGetQuery
            { QuestionId = request.QuestionId });
        if (question == null)
            return new PracticeQuestionDeleteResponse
            {
                IsSuccess = false,
                Message = "Practice Question is not found!"
            };
        var rs = await _practicequestionRepository.DeleteAsync(request);
        if (rs)
            return new PracticeQuestionDeleteResponse
            {
                IsSuccess = true,
                Message = "Delete Practice Question successfully!"
            };

        return new PracticeQuestionDeleteResponse
        {
            IsSuccess = false,
            Message = "Delete Practice Question failed!"
        };
    }

    //public async Task<bool> Handle(PracticequestionDeleteCommand request, CancellationToken cancellationToken)
    //{
    //    return await _practicequestionRepository.DeleteAsync(request);
    //}
}