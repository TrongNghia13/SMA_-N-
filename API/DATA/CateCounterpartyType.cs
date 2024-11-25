using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class CateCounterpartyType
    {
        public CateCounterpartyType()
        {
            CateCounterparties = new HashSet<CateCounterparty>();
            CateCounterpartyGroups = new HashSet<CateCounterpartyGroup>();
        }

        public string CounterpartyTypeID { get; set; } = null!;
        public string? CounterpartyTypeName { get; set; }

        public virtual ICollection<CateCounterparty> CateCounterparties { get; set; }
        public virtual ICollection<CateCounterpartyGroup> CateCounterpartyGroups { get; set; }
    }
}
