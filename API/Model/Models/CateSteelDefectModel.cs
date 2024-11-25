using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateSteelDefectModel
    {
        public int SteelDefectID { get; set; }
        public string? DefectName { get; set; }
        public string? DefectType { get; set; }
        public int? ParentID { get; set; }
        public string? Material { get; set; }
    }
}
