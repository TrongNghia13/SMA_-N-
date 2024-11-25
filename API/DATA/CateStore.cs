using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateStore
    {
        public string StoreID { get; set; } = null!;
        public string? StoreName { get; set; }
        public string? StoreTypeID { get; set; }
        public string? BranchID { get; set; }
        public string? StoreAddress { get; set; }
        public string? StoreKeeperName { get; set; }
        public string? Sign { get; set; }
        public string? Description { get; set; }

        public virtual Branch? Branch { get; set; }
        public virtual CateStoreType? StoreType { get; set; }
        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
