using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class MenuApp
    {
        public MenuApp()
        {
            RoleApps = new HashSet<RoleApp>();
        }

        public int MenuAppID { get; set; }
        public string? MenuAppName { get; set; }
        public string? MenuAppKey { get; set; }
        public int? SortOrder { get; set; }

        public virtual ICollection<RoleApp> RoleApps { get; set; }
    }
}
