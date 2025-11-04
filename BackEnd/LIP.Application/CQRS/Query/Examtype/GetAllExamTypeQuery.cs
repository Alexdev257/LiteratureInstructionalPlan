using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.Examtype
{
    public class GetAllExamTypeQuery : PaginationRequest, IRequest<GetAllExamTypeResponse>
    {
        public string? Name { get; set; }
    }
}
