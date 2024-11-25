using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateProductTypeModel
    {
        public string ProductTypeID { get; set; } = null!;
        public string? ProductTypeName { get; set; }
        public string? ParentID { get; set; }
        public int? Length { get; set; }
        public bool? IsAutoPutId { get; set; }
        public bool? IsPrefix { get; set; }
    }
}
