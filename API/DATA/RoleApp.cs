using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class RoleApp
    {
        public int RoleAppID { get; set; }
        public int? MenuAppID { get; set; }
        public int? RoleID { get; set; }

        public virtual MenuApp? MenuApp { get; set; }
        public virtual Role? Role { get; set; }

    }
}
