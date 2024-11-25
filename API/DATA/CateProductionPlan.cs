using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
        public partial class CateProductionPlan
        {
           // public CateProductionPlan()
            //{
             //   MaterialExports = new HashSet<MaterialExport>();
               // PlanManufacturings = new HashSet<PlanManufacturing>();
            //}

            public string ProductionPlanID { get; set; } = null!;
            public string? BranchID { get; set; }
            public string? PlanTypeID { get; set; }
            public string? PlanNo { get; set; }
            public string? PlanName { get; set; }
            public DateTime? PlanDate { get; set; }
            public string? PlanDescription { get; set; }
            public bool? IsFinish { get; set; }

            public virtual CatePlanType? PlanType { get; set; }
            public virtual ICollection<MaterialExport> MaterialExports { get; set; }
            public virtual ICollection<PlanManufacturing> PlanManufacturings { get; set; }
        }
}
