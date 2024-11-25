using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateStoreModel
    {
        public string StoreID { get; set; } = null!;
        public string? StoreName { get; set; }
        public string? StoreTypeID { get; set; }
        public string? BranchID { get; set; }
        public string? StoreAddress { get; set; }
        public string? StoreKeeperName { get; set; }
        public string? Sign { get; set; }
        public string? Description { get; set; }
    }
}
