using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class RoleMenu
    {
        public int RoleMenuID { get; set; }

        public int? RoleID { get; set; }

        public int? MenuID { get; set; }

        public virtual Menu? Menu { get; set; }

        public virtual Role? Role { get; set; }

    }
}
