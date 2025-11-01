using LIP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.ExamMatrix
{
    public class ExamMatrixCreateCommand
    {
        //public int MatrixId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? GradeLevelId { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
        //public bool IsDeleted { get; set; }
        //public DateTime DeletedAt { get; set; }


        //public virtual User? CreatedByNavigation
        //{
        //    get; set;
        //}

        //public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

        //public virtual GradeLevel? GradeLevel
        //{
        //    get; set;
        //}

        //public virtual ICollection<ExamMatrixDetail> Exammatrixdetails { get; set; } = new List<ExamMatrixDetail>();
    }
}
