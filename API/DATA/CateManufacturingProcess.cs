using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateManufacturingProcess
    {
        public CateManufacturingProcess()
        {
            WorkProcesses = new HashSet<WorkProcess>();
        }

        public string ManufacturingProcessID { get; set; } = null!;
        public string? ManufacturingProcessName { get; set; }
        public string? ManufacturingProcessDescription { get; set; }

        public virtual ICollection<WorkProcess> WorkProcesses { get; set; }
    }
}
