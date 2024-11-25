using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class MaterialExport
    {
        public decimal MaterialExportID { get; set; }
        public decimal? ReceiptID { get; set; }
        public string? ProductionPlanID { get; set; }

        public virtual CateProductionPlan? ProductionPlan { get; set; }
        public virtual Receipt? Receipt { get; set; }
    }
}
