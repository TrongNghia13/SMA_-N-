using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateCounterpartyGroupModel
    {
        public string CounterpartyGroupID { get; set; } = null!;
        public string? CounterpartyGroupName { get; set; }
        public string? CounterpartyType { get; set; }
        public bool? IsChild { get; set; }
        public int? Length { get; set; }
        public bool? IsAutoPutID { get; set; }
        public bool? IsPrefix { get; set; }
    }
}
