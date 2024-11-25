using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class WorkProcessModel
    {
        public string WorkProcessID { get; set; } = null!;
        public string? ManufacturingProcessID { get; set; }
        public string? WorkName { get; set; }
        public string? WorkDescription { get; set; }
        public bool? IsMandatory { get; set; }
    }
}
