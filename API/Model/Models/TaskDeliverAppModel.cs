using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class TaskDeliverAppModel
    {
        public decimal TaskDeliverAppID { get; set; }
        public string? ReceiptNo { get; set; }
        public DateTime? TaskDate { get; set; }
        public string? UserName { get; set; }
        public string? ProductionPlanID { get; set; }
        public string? StoreID { get; set; }
        public string? MaterialType { get; set; }
        public string? Vendor { get; set; }
        public string? Width { get; set; }
        public string? Thickness { get; set; }
        public string? ProductionBatchNo { get; set; }
        public int? Quantity { get; set; }
        public bool? IsFinish { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
