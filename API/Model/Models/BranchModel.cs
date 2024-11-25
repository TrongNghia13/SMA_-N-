using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class BranchModel
    {
        public string BranchID { get; set; } = null!;
        public int? OrganizationUnitTypeID { get; set; }
        public string? BranchName { get; set; }
        public string? BranchAddress { get; set; }
        public string? BranchTel { get; set; }
        public string? BranchWebsite { get; set; }
        public string? BranchTaxCode { get; set; }
        public string? BranchBankAccount { get; set; }
        public string? BranchBankName { get; set; }
        public string? DirectorName { get; set; }
        public string? ChiefOfAccountingName { get; set; }
        public string? StoreKeeperName { get; set; }
        public string? ReporterDate { get; set; }
        public string? DirectorTitle { get; set; }
        public string? BranchCity { get; set; }
        public string? BranchLogo { get; set; }
        public bool? IsVisibleLogo { get; set; }
    }
}
