using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class PlanManufacturingModel
    {
        public decimal PlanManufacturingID { get; set; }
        public string? BranchID { get; set; }
        public string? MonthID { get; set; }
        public DateTime? PlanDate { get; set; }
        public string? MaterialType { get; set; } = null!;
        public string? PlanNo { get; set; } = null!;
        public string? ProductionPlanID { get; set; }
        public string? PlanDescription { get; set; }
        public decimal? TotalSource { get; set; }
        public decimal? TotalTarget { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        
    }      

}
