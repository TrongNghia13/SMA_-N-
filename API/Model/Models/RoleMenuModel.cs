using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class RoleMenuModel
    {
        public int RoleMenuID { get; set; }

        public int? RoleID { get; set; }

        public int? MenuID { get; set; }
        public string? MenuName { get; set; }
        public string? RoleName { get; set; }


    }
}
