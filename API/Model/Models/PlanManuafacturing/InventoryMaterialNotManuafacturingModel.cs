using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.PlanManuafacturing
{
    public class InventoryMaterialNotManuafacturingModel :ReceiptImeiWithDefectDetail
    {
        public decimal? PlanDetailInputID { get; set; }
        public decimal? WeightActual { get; set; }

    }
}
