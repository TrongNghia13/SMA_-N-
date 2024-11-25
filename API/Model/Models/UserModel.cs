using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class UserModel
    {
        public int UserID { get; set; }

        public int? EmployeeID { get; set; }

        public string? UserName { get; set; }

        public string? Password { get; set; }

        public bool? IsActive { get; set; }

        public string? PasswordRealTime { get; set; }

        public int? DashBoardID { get; set; }

        public string? RefreshToken { get; set; }

        public bool? IsAccessHour { get; set; }

        public bool? IsAccessIP { get; set; }

        public string? PublicIP { get; set; }
        public string? RegistrationToken { get; set; }
        public string? FullName { get; set; }


    }
}
