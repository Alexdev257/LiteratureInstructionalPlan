using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Practicequestion
{
    public class GetPracticequestionQueryHandler : IRequestHandler<GetPracticequestionQuery, GetPracticequestionResponse>
    {
        private readonly IPracticequestionRepository _practicequestionRepository;
        public GetPracticequestionQueryHandler(IPracticequestionRepository practicequestionRepository)
        {
            _practicequestionRepository = practicequestionRepository;
        }
        public async Task<GetPracticequestionResponse> Handle(GetPracticequestionQuery request, CancellationToken cancellationToken)
        {
            var rs = await _practicequestionRepository.GetAsync(new PracticequestionGetQuery { QuestionId = request.QuestionId, IsAdmin = request.IsAdmin });
            if (rs == null)
            {
                return new GetPracticequestionResponse
                {
                    IsSuccess = false,
                    Message = "Question is not exist!"
                };
            }
            else
            {
                var responseDTO = new GetPracticequestionResponseDTO
                {
                    QuestionId = rs.QuestionId,
                    Content = rs.Content,
                    QuestionType = rs.QuestionType,
                    Difficulty = rs.Difficulty,
                    Answer = rs.Answer,
                    GradeLevelId = rs.GradeLevelId,
                    CreatedByNavigationUserId = rs.CreatedByNavigationUserId,
                    CreatedAt = rs.CreatedAt
                };
                return new GetPracticequestionResponse
                {
                    IsSuccess = true,
                    Data = responseDTO,
                    Message = "Get Question successfully!"
                };
            }
        }
    }
}
