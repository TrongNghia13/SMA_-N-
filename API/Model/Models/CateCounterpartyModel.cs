using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateCounterpartyModel
    {
        public string CounterpartyID { get; set; } = null!;
        public string? CounterpartyName { get; set; }
        public string? CounterpartyType { get; set; }
        public string? CounterpartyGroup { get; set; }
        public string? CounterpartyAddress { get; set; }
        public string? CounterpartyTel { get; set; }
        public string? CounterpartyEmail { get; set; }
        public string? CounterpartyTaxCode { get; set; }
        public string? CounterpartyDescription { get; set; }
        public bool? IsRelationship { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
