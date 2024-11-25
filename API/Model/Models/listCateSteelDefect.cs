using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ListCateSteelDefect
    {
        public int? SteelDefectID { get; set; }
        public string? DefectName { get; set; }
        public string? Material { get; set; }
        public List<ListCateSteelDefect>? Option1 { get; set; }
        public List<ListCateSteelDefect>? Option2 { get; set; }
        public List<ListCateSteelDefect>? Option3 { get; set; }
        public List<ListCateSteelDefect>? Option4 { get; set; }


    }
}
