using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReportModel
    {
        public int ReportId { get; set; }
        public string? ReportName { get; set; }
        public string? FormKey { get; set; }
        public string? Tsql { get; set; }
        public int? ReportGroupId { get; set; }
        public bool? IsActive { get; set; }
        public string? PaperSize { get; set; }
        public int? Orientation { get; set; }
        public int? LeftHeadlineId { get; set; }
        public bool? IsRightHeadline { get; set; }
        public int? MarginLeft { get; set; }
        public int? MarginRight { get; set; }
        public int? MarginTop { get; set; }
        public int? MarginBottom { get; set; }
        public int? SortOrder { get; set; }
        public bool? IsLock { get; set; }
    }
}
