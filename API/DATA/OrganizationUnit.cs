using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;

namespace DATA
{
    public partial class OrganizationUnit
    {
        public OrganizationUnit()
        {
            Employees = new HashSet<Employee>();
        }

        public int OrganizationUnitID { get; set; }
        public string? OrganizationUnitName { get; set; }
        public bool? IsParent { get; set; }
        public int? OrganizationUnitTypeID { get; set; }
        public string? CompanyOwnerName { get; set; }
        public string? Phone { get; set; }
        public int? SortOrder { get; set; }

        public virtual OrganizationUnitType? OrganizationUnitType { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
