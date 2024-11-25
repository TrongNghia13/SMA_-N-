using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class UserRoleMobile
    {
        public int UraID { get; set; }
        public int? UserID { get; set; }
        public int? RoleAppID { get; set; }
        public virtual RoleApp? RoleApps { get; set; }


    }
}
