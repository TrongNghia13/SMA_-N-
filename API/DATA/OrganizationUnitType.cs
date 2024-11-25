using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class OrganizationUnitType
    {
        public OrganizationUnitType()
        {
            Branches = new HashSet<Branch>();
            OrganizationUnits = new HashSet<OrganizationUnit>();
        }

        public int OrganizationUnitTypeID { get; set; }
        public string? OrganizationUnitTypeName { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Branch> Branches { get; set; }
        public virtual ICollection<OrganizationUnit> OrganizationUnits { get; set; }
    }
}
