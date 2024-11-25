using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class OrganizationUnitModel
    {
        public int OrganizationUnitID { get; set; }

        public string? OrganizationUnitName { get; set; }

        public bool? IsParent { get; set; }

        public int? OrganizationUnitTypeID { get; set; }

        public string? CompanyOwnerName { get; set; }

        public string? Phone { get; set; }

        public int? SortOrder { get; set; }

    }
    public class OrganizationUnitVm : OrganizationUnitModel
    {
        public string? OrganizationUnitTypeName { get; set; }
    }
    public class OrganizationUnitTreeTable : OrganizationUnitVm
    {
        public string? Key { get; set; }
        public List<OrganizationUnitTreeTable>? children { get; set; }

    }
}
