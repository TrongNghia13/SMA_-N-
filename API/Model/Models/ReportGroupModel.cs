using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReportGroupModel
    {
        public int ReportGroupId { get; set; }
        public string? ReportGroupName { get; set; }
        public string? Description { get; set; }
        public int? SortOrder { get; set; }
    }
}
