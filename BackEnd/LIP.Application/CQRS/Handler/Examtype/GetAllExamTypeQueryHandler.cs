using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.DTOs;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class GetAllExamTypeQueryHandler : IRequestHandler<GetAllExamTypeQuery, GetAllExamTypeResponse>
    {
        private readonly IExamtypeRepository _examtypeRepository;
        public GetAllExamTypeQueryHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }
        public async Task<GetAllExamTypeResponse> Handle(GetAllExamTypeQuery request, CancellationToken cancellationToken)
        {
            var rs = await _examtypeRepository.GetAllAsync(new ExamtypeGetAllQuery { Name = request.Name });
            var dataList = rs.Select(r => new GetAllExamTypeResponseDTO
            {
                ExamTypeId = r.ExamTypeId,
                Name = r.Name,
            }).ToList();
            //if(dataList.Count > 0)
            //{
            //    return new GetAllExamTypeResponse
            //    {
            //        IsSuccess = true,
            //        Data = dataList,
            //        Message = "Get All ExamType successfully!"
            //    };
            //}
            //else
            //{
            //    return new GetAllExamTypeResponse
            //    {
            //        IsSuccess = false,
            //        Message = "No ExamType in system!!"
            //    };
            //}

            var paged = dataList.ToPagedListAsync(request.PageNumber, request.PageSize);
            return new GetAllExamTypeResponse
            {
                IsSuccess = paged.Items.Any(),
                Data = paged,
                Message = paged.Items.Any()
                ? "Get All ExamTypes successfully!"
                : "No ExamTypes in system!"
            };
        }
    }
}
