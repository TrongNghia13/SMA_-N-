using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class ReceiptImei
    {
        public ReceiptImei()
        {
            DeliveryDetailInputs = new HashSet<DeliveryDetail>();
            DeliveryDetailOutputs = new HashSet<DeliveryDetail>();
            PlanDetailInputs = new HashSet<PlanDetailInput>();
            ProductImeis = new HashSet<ProductImei>();
        }

        public decimal ReceiptImeiID { get; set; }
        public decimal? ReceiptID { get; set; }
        public decimal? ReceiptDetailID { get; set; }
        public string? SteelType { get; set; }
        public string? Standard { get; set; }
        public string? Vendor { get; set; }
        public string? ProductionBatchNo { get; set; }
        public string? GalvanizedOrganization { get; set; }
        public string? SteelPrice { get; set; }
        public string? Width { get; set; }
        public string? Thickness { get; set; }
        public decimal? Weight1 { get; set; }
        public decimal? Weight2 { get; set; }
        public decimal? Weight3 { get; set; }

        public string? Imei { get; set; }
        public string? Specification { get; set; }
        public string? Description { get; set; }
        public int? SortOrder { get; set; }

        public virtual Receipt? Receipt { get; set; }
        public virtual ReceiptDetail? ReceiptDetail { get; set; }
        public virtual ICollection<DeliveryDetail> DeliveryDetailInputs { get; set; }
        public virtual ICollection<DeliveryDetail> DeliveryDetailOutputs { get; set; }
        public virtual ICollection<PlanDetailInput> PlanDetailInputs { get; set; }
        public virtual ICollection<ProductImei> ProductImeis { get; set; }
    }
}

