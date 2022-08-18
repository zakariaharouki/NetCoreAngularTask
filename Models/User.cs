using System;
using System.Collections.Generic;

namespace NetCoreAngularTask.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime Dob { get; set; }
        public string Password { get; set; } = null!;
        public int Role { get; set; }
        public bool IsApproved { get; set; }
    }
}
