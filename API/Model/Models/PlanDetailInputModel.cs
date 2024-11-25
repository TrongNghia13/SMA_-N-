using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class PlanDetailInputModel
    {
        public decimal PlanDetailInputID { get; set; }
        public decimal? PlanManufacturingID { get; set; }
        public decimal? ReceiptImeiID { get; set; }
        public DateTime? ReceiptDate { get; set; }
        public string? ReceiptNo { get; set; }
        public string? ProductID { get; set; }
        public decimal? Quantity { get; set; }
        public string? Standard { get; set; }
        public string? ProductionBatchNo { get; set; }
        public string? GalvanizedOrganization { get; set; }
        public string? SteelPrice { get; set; }
        public string? Vendor { get; set; }
        public string? SteelType { get; set; }
        public string? Width { get; set; }
        public string? Thickness { get; set; }
        public decimal? Weight { get; set; }
        public decimal? WeightActual { get; set; }
        public string? Imei { get; set; }
        public string? Specification { get; set; }
        public string? Description { get; set; }
        public int? SortOrder { get; set; }
        public List<PlanDetailOutputModel>? khras { get; set; }
    }
}
