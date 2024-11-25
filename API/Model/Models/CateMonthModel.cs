using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateMonthModel
    {
        public string MonthID { get; set; } = null!;
        public string? ExplainDetail { get; set; }
        public bool? IsLock { get; set; }
    }
}
