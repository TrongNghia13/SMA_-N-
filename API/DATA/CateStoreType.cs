using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateStoreType
    {
        public CateStoreType()
        {
            CateStores = new HashSet<CateStore>();
        }

        public string StoreTypeID { get; set; } = null!;
        public string? StoreTypeName { get; set; }

        public virtual ICollection<CateStore> CateStores { get; set; }
    }
}
