using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class UserRoleModel
    {
        public int UserRoleID { get; set; }

        public int? UserID { get; set; }

        public int? RoleID { get; set; }
    }
}
