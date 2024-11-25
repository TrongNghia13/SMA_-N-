using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class RoleReportModel
    {
        public int RoleReportID { get; set; }
        public int? RoleID { get; set; }
        public int? ReportID { get; set; }
        public string? ReportName { get; set; }
        public string? RoleName { get; set; }

    }
}
