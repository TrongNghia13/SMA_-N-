using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateMonth
    {
        //public OpenReceipt()
        //{
        //    Receipts = new HashSet<Receipt>();
        //}

        public string MonthID { get; set; } = null!;
        public string? ExplainDetail { get; set; }
        public bool? IsLock { get; set; }

        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
