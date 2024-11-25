using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class UserBranch
    {
        public int UserBranchID { get; set; }
        public int? UserID { get; set; }
        public string? BranchID { get; set; }

        public virtual Branch? Branch { get; set; }
        public virtual User? User { get; set; }

    }
}
