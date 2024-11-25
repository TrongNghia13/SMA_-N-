using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateBusiness
    {
        //public CateBusiness()
        //{
        //    Receipts = new HashSet<Receipt>();
        //}

        public string BusinessID { get; set; } = null!;
        public string? BusinessName { get; set; }
        public string? BusinessType { get; set; }

        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
