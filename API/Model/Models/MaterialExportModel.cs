using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class MaterialExportModel
    {
        public decimal MaterialExportID { get; set; }
        public decimal? ReceiptID { get; set; }
        public string? ProductionPlanID { get; set; }
    }
}
