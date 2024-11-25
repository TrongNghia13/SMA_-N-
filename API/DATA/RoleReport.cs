using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class RoleReport
    {
        public int RoleReportID { get; set; }
        public int? RoleID { get; set; }
        public int? ReportID { get; set; }

       // public virtual Report? Report { get; set; }
        public virtual Role? Role { get; set; }
    }
}
