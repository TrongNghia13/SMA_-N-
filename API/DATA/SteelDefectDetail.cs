using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class SteelDefectDetail
    {
        public decimal SteelDefectDetailID { get; set; }
        public string? Imei { get; set; }
        public int? Main { get; set; }
        public int? Option1 { get; set; }
        public int? Option2 { get; set; }
        public int? Option3 { get; set; }
        public int? Option4 { get; set; }
        public string? SteelDefectName { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
