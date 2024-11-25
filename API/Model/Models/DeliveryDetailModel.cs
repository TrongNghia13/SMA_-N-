using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class DeliveryDetailModel
    {
        public decimal DeliveryDetailID { get; set; }
        public string? Montly { get; set; }
        public string? StoreID { get; set; }
        public string? ProductID { get; set; }
        public decimal? OutputID { get; set; }
        public decimal? InputID { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? TotalAmount { get; set; }
    }
}
