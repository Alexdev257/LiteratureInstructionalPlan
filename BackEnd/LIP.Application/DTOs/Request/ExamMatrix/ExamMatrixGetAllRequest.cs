using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Request.ExamMatrix
{
    public class ExamMatrixGetAllRequest : PaginationRequest
    {
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public bool? IsAdmin { get; set; } = false;
    }
}
