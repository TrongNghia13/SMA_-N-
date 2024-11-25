using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ReportGroup
    {
        public ReportGroup()
        {
            Reports = new HashSet<Report>();
        }

        public int ReportGroupId { get; set; }
        public string? ReportGroupName { get; set; }
        public string? Description { get; set; }
        public int? SortOrder { get; set; }

        public virtual ICollection<Report> Reports { get; set; }
    }
}
