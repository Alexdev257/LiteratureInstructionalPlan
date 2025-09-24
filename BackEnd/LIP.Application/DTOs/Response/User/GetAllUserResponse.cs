﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.DTOs.Response.User
{
    public class GetAllUserResponse : CommonReponse<List<GetAllUserResponseDTO>> { }
    public class GetAllUserResponseDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        //public string Password { get; set; } = null!;
        public int? RoleId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime DeletedAt { get; set; }
    }
}
