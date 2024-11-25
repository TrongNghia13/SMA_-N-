using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class MainMenuModel
    {
        public int MainMenuID { get; set; }

        public string? MainMenuName { get; set; }

        public int? SortOrder { get; set; }

        public string? Icon { get; set; }
        public List<MenuModel>? listMenu{get;set;}
    }
}