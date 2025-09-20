﻿using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? RoleId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Examattempt> Examattempts { get; set; } = new List<Examattempt>();

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<Practicequestion> Practicequestions { get; set; } = new List<Practicequestion>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();

    public virtual ICollection<Template> Templates { get; set; } = new List<Template>();

    public bool IsDeleted { get; set; } = false;

    public DateTime DeletedAt { get; set; }

}
