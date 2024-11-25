using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReceiptModel
    {
        public decimal ReceiptID { get; set; }
        public string? BranchID { get; set; }
        public string? MonthID { get; set; }
        public string? MaterialType { get; set; }
        public DateTime ReceiptDate { get; set; }
        public string ReceiptType { get; set; } = null!;
        public string? BusinessID { get; set; }
        public string ReceiptNo { get; set; } = null!;
        public string? ReceiptContent { get; set; }
        public string? EmployeeCode { get; set; }
        public string? StoreID { get; set; }
        public string? CounterpartyID { get; set; }
        public bool? IsPrintBarCode { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class ReceiptVmModel : ReceiptModel
    {
        public decimal? Quantity { get; set; }
        public string? CounterpartyName { get; set; }
        public string? CounterpartyGroup { get; set; }
        public string? LicensePlate { get; set; }
        public string? WorkProcessID { get; set; }
        public string? productionPlanID { get; set; }

    }
}
