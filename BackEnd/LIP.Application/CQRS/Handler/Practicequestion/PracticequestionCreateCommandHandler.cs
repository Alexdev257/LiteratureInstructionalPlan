using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion;

public class
    PracticequestionCreateCommandHandler : IRequestHandler<PracticequestionCreateCommand,
    PracticeQuestionCreateResponse>
{
    private readonly IPracticequestionRepository _practicequestionRepository;

    public PracticequestionCreateCommandHandler(IPracticequestionRepository practicequestionRepository)
    {
        _practicequestionRepository = practicequestionRepository;
    }

    public async Task<PracticeQuestionCreateResponse> Handle(PracticequestionCreateCommand request,
        CancellationToken cancellationToken)
    {
        request.CreatedAt = DateTime.UtcNow;
        //string? answerJson = null;
        //if(request.Answer != null && request.Answer.Any())
        //{
        //    answerJson = JsonSerializer.Serialize(request.Answer);
        //}
        //request.Answer = answerJson;
        var rs = await _practicequestionRepository.CreateAsync(request);
        if (rs)
            return new PracticeQuestionCreateResponse
            {
                IsSuccess = true,
                Message = "Create Practice Question successfully!"
            };

        return new PracticeQuestionCreateResponse
        {
            IsSuccess = false,
            Message = "Create Practice Question failed"
        };
    }
}