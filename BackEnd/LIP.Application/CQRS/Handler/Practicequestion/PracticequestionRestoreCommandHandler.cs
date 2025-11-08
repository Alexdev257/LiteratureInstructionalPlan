using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class
    PracticequestionRestoreCommandHandler : IRequestHandler<PracticequestionRestoreCommand,
    PracticeQuestionRestoreResponse>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public PracticequestionRestoreCommandHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<PracticeQuestionRestoreResponse> Handle(PracticequestionRestoreCommand request,
        CancellationToken cancellationToken)
    {
        var question = await _practicequestionRepository.GetAsync(new PracticequestionGetQuery
            { QuestionId = request.QuestionId, IsAdmin = true });
        if (question == null)
            return new PracticeQuestionRestoreResponse
            {
                IsSuccess = false,
                Message = "Practice Question is not found!"
            };
        var rs = await _practicequestionRepository.RestoreAsync(request);
        if (rs)
            return new PracticeQuestionRestoreResponse
            {
                IsSuccess = true,
                Message = "Restore Practice Question successfully!"
            };

        return new PracticeQuestionRestoreResponse
        {
            IsSuccess = false,
            Message = "Restore Practice Question failed"
        };
    }
}