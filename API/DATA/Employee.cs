using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Employee
    {
        public Employee()
        {
            Users = new HashSet<User>();
        }

        public int EmployeeID { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public int? OrganizationUnitID { get; set; }
        public string? FullName { get; set; }
        public int? JobTitleID { get; set; }
        public string? EmployeeTel { get; set; }
        public string? EmployeeEmail { get; set; }
        public string? EmployeeImage { get; set; }
        public string? Description { get; set; }

        public virtual CateJobTitle? JobTitle { get; set; }
        public virtual OrganizationUnit? OrganizationUnit { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}

