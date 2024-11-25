using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ReceiptDetail
    {
        public ReceiptDetail()
        {
            ReceiptImeis = new HashSet<ReceiptImei>();
        }

        public decimal ReceiptDetailID { get; set; }
        public decimal ReceiptID { get; set; }
        public string ProductID { get; set; } = null!;
        public string? CalculationUnit { get; set; }
        public decimal Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? TotalWeight1 { get; set; }
        public decimal? TotalWeight2 { get; set; }
        public decimal? TotalWeight3 { get; set; }
        public bool? IsImei { get; set; }
        public string? Description { get; set; }
        public DateTime? CreateDate { get; set; }
        public virtual Receipt Receipt { get; set; } = null!;
        public virtual ICollection<ReceiptImei> ReceiptImeis { get; set; }
    }
}

