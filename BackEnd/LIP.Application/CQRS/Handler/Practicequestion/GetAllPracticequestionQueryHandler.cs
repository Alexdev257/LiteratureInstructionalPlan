using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.PracticeQuestion;
using LIP.Application.Interface.Repository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Practicequestion
{
    public class GetAllPracticequestionQueryHandler : IRequestHandler<GetAllPracticequestionQuery, GetAllPracticeQuestionResponse>
    {
        private readonly IPracticequestionRepository _practicequestionRepository;
        public GetAllPracticequestionQueryHandler(IPracticequestionRepository practicequestionRepository)
        {
            _practicequestionRepository = practicequestionRepository;
        }
        public async Task<GetAllPracticeQuestionResponse> Handle(GetAllPracticequestionQuery request, CancellationToken cancellationToken)
        {
            var rs = await _practicequestionRepository.GetAllAsync(new PracticequestionGetAllQuery { QuestionType = request.QuestionType, GradeLevelId = request.GradeLevelId, CreatedBy = request.CreatedByUserId, IsAdmin = request.IsAdmin });
            if (rs == null)
            {
                return new GetAllPracticeQuestionResponse
                {
                    IsSuccess = false,
                    Message = "No Questions in system!"
                };
            }
            var dataList = rs.Select(r => new GetAllPracticeQuestionResponseDTO
            {
                QuestionId = r.QuestionId,
                Content = r.Content,
                QuestionType = r.QuestionType,
                Difficulty = r.Difficulty,
                //Answer = r.Answer,
                Answer = !request.IsShowAnswer.Value 
                                ? new List<AnswerOption>() 
                                : string.IsNullOrWhiteSpace(r.Answer)
                                    ? new List<AnswerOption>()
                                    : JsonSerializer.Deserialize<List<AnswerOption>>(r.Answer!),
                CorrectAnswer = !request.IsShowCorrectAnswer.Value 
                                ? new List<AnswerOption>() 
                                : string.IsNullOrWhiteSpace(r.CorrectAnswer)
                                    ? new List<AnswerOption>()
                                    : JsonSerializer.Deserialize<List<AnswerOption>>(r.CorrectAnswer!),
                GradeLevelId = r.GradeLevelId,
                CreatedByNavigationUserId = r.CreatedByNavigationUserId,
                CreatedAt = r.CreatedAt
            }).ToList();
            //if (dataList.Count > 0)
            //{
            //    return new GetAllPracticeQuestionResponse
            //    {
            //        IsSuccess = true,
            //        Data = dataList,
            //        Message = "Get All Question successfully!"
            //    };
            //}
            //else
            //{
            //    return new GetAllPracticeQuestionResponse
            //    {
            //        IsSuccess = false,
            //        Message = "No Questions in system!"
            //    };
            //}

            var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
            return new GetAllPracticeQuestionResponse
            {
                IsSuccess = paged.Items.Any(),
                Data = paged,
                Message = paged.Items.Any()
                ? "Get All Question successfully!"
                : "No Questions in system!"
            };

        }
    }
}
