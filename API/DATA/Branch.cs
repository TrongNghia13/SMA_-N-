using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Branch
    {
        public Branch()
        {
            CateStores = new HashSet<CateStore>();
            UserBranches = new HashSet<UserBranch>();
        }

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

        public virtual OrganizationUnitType? OrganizationUnitType { get; set; }
        public virtual ICollection<CateStore> CateStores { get; set; }
        public virtual ICollection<UserBranch> UserBranches { get; set; }
    }
}
