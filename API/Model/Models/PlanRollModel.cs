using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class PlanRollModel
    {
        public string ProductionPlanID { get; set; }
        public string PlanName { get; set; }
        public string BranchID { get; set; }
        public int soxuat { get; set; }
        public int TotalSource { get; set; }
        public int TotalTarget { get; set; }
        public int sodacan { get; set; }
        public int TotalExist { get; set; }
    }
}
