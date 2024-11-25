using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReceiptSearchModel
    {
        public string? BranchID { get; set; }
        public string? ReceiptNo { get; set; }
        public string? Frdate { get; set; }
        public string? Todate { get; set; }
        public string? CounterpartyID { get; set; }
        public string? MaterialType { get; set; }
        public string? BusinessID { get; set; }
        public string? EmployeeID { get; set; }



    }
}
