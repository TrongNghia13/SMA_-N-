using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class CatePlanType
    {
        public CatePlanType()
        {
            CateProductionPlans = new HashSet<CateProductionPlan>();
        }

        public string PlanTypeID { get; set; } = null!;
        public string? PlanTypeName { get; set; }

        public virtual ICollection<CateProductionPlan> CateProductionPlans { get; set; }
    }
}
