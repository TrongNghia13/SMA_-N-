using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateManufacturingProcessModel
    {
        public string ManufacturingProcessID { get; set; } = null!;
        public string? ManufacturingProcessName { get; set; }
        public string? ManufacturingProcessDescription { get; set; }
    }
}
