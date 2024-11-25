using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateProduct
    {
        public string ProductId { get; set; } = null!;
        public string? ProductTypeId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductUnit { get; set; }
        public string? Specification { get; set; }
        public int? StockMin { get; set; }
        public int? StockMax { get; set; }
        public string? Description { get; set; }
        public bool? IsUse { get; set; }
        public string? Image { get; set; }

        public virtual CateProductType? ProductType { get; set; }
        public virtual ICollection<ProductImei> ProductImeis { get; set; }

    }
}
