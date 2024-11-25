using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Role
    {
        public Role()
        {
            RoleApps = new HashSet<RoleApp>();
            RoleMenus = new HashSet<RoleMenu>();
            RoleReports = new HashSet<RoleReport>();
            UserRoles = new HashSet<UserRole>();
        }

        public int RoleID { get; set; }
        public string? RoleName { get; set; }
        public string? RoleComment { get; set; }
        public string? RoleType { get; set; }

        public virtual ICollection<RoleApp> RoleApps { get; set; }
        public virtual ICollection<RoleMenu> RoleMenus { get; set; }
        public virtual ICollection<RoleReport> RoleReports { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}

