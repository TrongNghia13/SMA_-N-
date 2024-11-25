using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class TracingProduct
    {
        public decimal TracingProductID { get; set; }
        public decimal? RelatedDocumentID { get; set; }
        public string? WorkProcessID { get; set; }
        public string? Imei { get; set; }
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
        public decimal? Weight1 { get; set; }
        public decimal? Weight2 { get; set; }
        public decimal? Weight3 { get; set; }
        public string? Specification { get; set; }
        public string? Note { get; set; }
        public decimal? ParentID { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual PlanManufacturing? RelatedDocument { get; set; }
        public virtual Receipt? RelatedDocumentNavigation { get; set; }
        public virtual WorkProcess? WorkProcess { get; set; }
    }
}

