using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateProductionPlanModel
    {
        public string ProductionPlanID { get; set; } = null!;
        public string? BranchID { get; set; }
        public string? PlanTypeID { get; set; }
        public string? PlanNo { get; set; }
        public string? PlanName { get; set; }
        public DateTime? PlanDate { get; set; }
        public string? PlanDescription { get; set; }
        public bool? IsFinish { get; set; }
    }
}
