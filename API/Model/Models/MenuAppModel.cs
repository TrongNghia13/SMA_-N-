using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class MenuAppModel
    {
        public int MenuAppID { get; set; }
        public string? MenuAppName { get; set; }
        public string? MenuAppKey { get; set; }
        public int? SortOrder { get; set; }
    }
}
