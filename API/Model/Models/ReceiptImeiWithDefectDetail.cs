using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReceiptImeiWithDefectDetail
    {
        public decimal? ReceiptImeiID { get; set; }
        public decimal? ReceiptID { get; set; }
        public decimal? ReceiptDetailID { get; set; }
        public string? ProductID { get; set; }
        public int? Quantity { get; set; }
        public string? SteelType { get; set; }
        public string? Standard { get; set; }
        public string? Vendor { get; set; }
        public string? ProductionBatchNo { get; set; }
        public string? GalvanizedOrganization { get; set; }
        public string? SteelPrice { get; set; }
        public string? Width { get; set; }
        public string? Thickness { get; set; }
        public decimal? Weight { get; set; }
        public string? Imei { get; set; }
        public string? Specification { get; set; }
        public string? Description { get; set; }
        public int? SortOrder { get; set; }
        public decimal? ParentID { get; set; }
        public int? Weight1 { get; set; }
        public int? Weight2 { get; set; }
        public int? Weight3 { get; set; }
        public string? Image { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }
        public string? WorkProcessID { get; set; }
        public List<SteelDefectDetailModel>? listSteelDefectDetails { get; set; }
    }

    public class InStockMaterialModel : ReceiptImeiWithDefectDetail
    {
        public string ProductionPlanId { get; set; }
        public string? ReceiptNo { get; set; }
        public DateTime? CreateDate { get; set; }
    }

    public class ReceiptImeiVmModel : ReceiptImeiWithDefectDetail
    {
        public string? Key { get; set; }
        public string? ReceiptNo { get; set; }

    }
}
