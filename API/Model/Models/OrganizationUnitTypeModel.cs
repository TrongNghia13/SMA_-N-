using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class OrganizationUnitTypeModel
    {
        public int OrganizationUnitTypeID { get; set; }

        public string? OrganizationUnitTypeName { get; set; }

        public string? Description { get; set; }
    }
}
