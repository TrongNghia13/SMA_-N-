using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class MenuModel
    {
        public int MenuID { get; set; }
        public string? MenuName { get; set; }
        public int? MainMenuID { get; set; }
        public string? MenuKey { get; set; }
        public int? SortOrder { get; set; }
        public string? Icon { get; set; }
        public bool? IsFastAccess { get; set; }

    }
}
