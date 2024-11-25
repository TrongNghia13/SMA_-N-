using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class MainMenu
    {
        public MainMenu()
        {
            Menus = new HashSet<Menu>();
        }

        public int MainMenuID { get; set; }
        public string? MainMenuName { get; set; }
        public int? SortOrder { get; set; }
        public string? Icon { get; set; }

        public virtual ICollection<Menu> Menus { get; set; }
    }
}