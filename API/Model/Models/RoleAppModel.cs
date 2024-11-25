using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class RoleAppModel
    {
        public int RoleAppID { get; set; }
        public int? MenuAppID { get; set; }
        public int? RoleID { get; set; }
        public string? RoleName { get; set; }
        public string? MenuAppName { get; set; }


    }
}
