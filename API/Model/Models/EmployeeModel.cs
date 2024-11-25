using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class EmployeeModel
    {
        public int EmployeeID { get; set; }

        public string EmployeeCode { get; set; } = null!;

        public int? OrganizationUnitID { get; set; }

        public string? FullName { get; set; }

        public int? JobTitleID { get; set; }

        public string? EmployeeTel { get; set; }

        public string? EmployeeEmail { get; set; }

        public string? EmployeeImage { get; set; }

        public string? Description { get; set; }
        public string? JobTitleName { get; set; }
        public string? OrganizationUnitName { get; set; }

    }
}
