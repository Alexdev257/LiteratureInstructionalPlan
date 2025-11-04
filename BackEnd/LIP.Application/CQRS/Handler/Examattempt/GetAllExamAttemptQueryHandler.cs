using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.DTOs;
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
    public class GetAllExamAttemptQueryHandler : IRequestHandler<GetAllExamAttemptQuery, GetAllExamAttemptResponse>
    {
        private readonly IExamattemptRepository _examattemptRepository;
        public GetAllExamAttemptQueryHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }
        public async Task<GetAllExamAttemptResponse> Handle(GetAllExamAttemptQuery request, CancellationToken cancellationToken)
        {
            var attempts = await _examattemptRepository.GetAllAsync(new ExamattemptGetAllQuery { ExamId = request.ExamId, UserId = request.UserId, Status = request.Status, IsAdmin = request.IsAdmin });
            if(attempts == null || !attempts.Any())
            {
                return new GetAllExamAttemptResponse
                {
                    IsSuccess = false,
                    Message = "No Attempt in the system!"
                };
            }

            var dataList = attempts.Select(a => new GetAllExamAttemptResponseDTO
            {
                AttemptId = a.AttemptId,
                ExamId = a.ExamId,
                UserId = a.UserId,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Status = a.Status,
                Score = a.Score,
                Feedback = a.Feedback,
                LastSavedAt = a.LastSavedAt,
            }).ToList();
            var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
            return new GetAllExamAttemptResponse
            {
                IsSuccess = paged.Items.Any(),
                Data = paged,
                Message = paged.Items.Any()
                ? "Get All Attempts successfully!"
                : "No Attempts in system!"
            };
        }
    }
}
