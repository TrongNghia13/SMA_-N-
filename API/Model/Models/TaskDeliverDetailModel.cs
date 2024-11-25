using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class TaskDeliverDetailModel
    {
        public decimal TaskDeliverDetailID { get; set; }
        public decimal? TaskDeliverAppID { get; set; }
        public string? Imei { get; set; }
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
        public string? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
