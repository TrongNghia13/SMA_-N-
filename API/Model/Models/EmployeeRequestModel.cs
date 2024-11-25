using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class EmployeeRequestModel
    {
        public int? OrganizationUnitID { get; set; }
        public string? EmployeeCode { get; set; }
        public string? FullName { get; set; }
    }
}
