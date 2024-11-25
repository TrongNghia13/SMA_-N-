using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ReportParameter
    {
        public int ReportParameterId { get; set; }
        public int? ReportId { get; set; }
        public string? ReportParameterName { get; set; }
        public int? SortOrder { get; set; }
        public int? ReportParameterType { get; set; }
        public bool? Required { get; set; }
        public string? ParamName { get; set; }
        public bool? GetAuto { get; set; }
    }
}
