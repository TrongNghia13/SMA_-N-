using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class TreeData
    {
        public string Title { get; set; }
        public string? Value { get; set; }
        public string? Key { get; set; }
        public string? AttrData { get; set; }
        public string? CheckState { get; set; }
        public List<TreeData>? Children { get; set; }
    }
}
