using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Menu
    {
        public Menu()
        {
            RoleMenus = new HashSet<RoleMenu>();
        }

        public int MenuID { get; set; }
        public string? MenuName { get; set; }
        public int? MainMenuId { get; set; }
        public string? MenuKey { get; set; }
        public int? SortOrder { get; set; }
        public string? Icon { get; set; }
        public bool? IsFastAccess { get; set; }

        public virtual MainMenu? MainMenu { get; set; }
        public virtual ICollection<RoleMenu> RoleMenus { get; set; }
    }
}
