using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class DeliveryDetail
    {
        public decimal DeliveryDetailID { get; set; }
        public string? Month { get; set; }
        public string? StoreID { get; set; }
        public string? ProductID { get; set; }
        public decimal? OutputID { get; set; }
        public decimal? InputID { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? TotalAmount { get; set; }

        public virtual ReceiptImei? Input { get; set; }
        public virtual ReceiptImei? Output { get; set; }
    }
}
