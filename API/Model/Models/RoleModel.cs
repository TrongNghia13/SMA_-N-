using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class RoleModel
    {
        public int RoleID { get; set; }

        public string? RoleName { get; set; }

        public string? RoleComment { get; set; }

        public string? RoleType { get; set; }
    }
}