using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class WorkProcess
    {
        public WorkProcess()
        {
            ProductImeis = new HashSet<ProductImei>();
            TracingProducts = new HashSet<TracingProduct>();
        }

        public string WorkProcessID { get; set; } = null!;
        public string? ManufacturingProcessId { get; set; }
        public string? WorkName { get; set; }
        public string? WorkDescription { get; set; }
        public bool? IsMandatory { get; set; }

        public virtual CateManufacturingProcess? ManufacturingProcess { get; set; }
        public virtual ICollection<ProductImei> ProductImeis { get; set; }
        public virtual ICollection<TracingProduct> TracingProducts { get; set; }
    }
}
