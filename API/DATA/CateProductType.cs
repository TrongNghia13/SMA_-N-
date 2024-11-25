using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateProductType
    {
        //public CateProductType()
        //{
        //    CateProducts = new HashSet<CateProduct>();
        //}

        public string ProductTypeID { get; set; } = null!;
        public string? ProductTypeName { get; set; }
        public string? ParentID { get; set; }
        public int? Length { get; set; }
        public bool? IsAutoPutID { get; set; }
        public bool? IsPrefix { get; set; }
        public virtual ICollection<CateProduct> CateProducts { get; set; }
    }
}
