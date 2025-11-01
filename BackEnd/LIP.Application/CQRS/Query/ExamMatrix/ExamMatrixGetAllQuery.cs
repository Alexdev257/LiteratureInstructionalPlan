using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.ExamMatrix
{
    public class ExamMatrixGetAllQuery
    {
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
    }
}
