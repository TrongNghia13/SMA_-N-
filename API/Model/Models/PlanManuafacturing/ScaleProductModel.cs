using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.PlanManuafacturing
{
    public class ScaleProductModel:ReceiptImeiModel
    {
        public decimal planDetailInputID { get; set; }
        public List<PlanDetailOutputModel> listDetailOutputs { get; set; }
    }
}
