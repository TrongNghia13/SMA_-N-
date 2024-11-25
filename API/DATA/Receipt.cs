using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class Receipt
    {
        public Receipt()
        {
            MaterialExports = new HashSet<MaterialExport>();
            ReceiptDetails = new HashSet<ReceiptDetail>();
            ReceiptImeis = new HashSet<ReceiptImei>();
            TracingProducts = new HashSet<TracingProduct>();
            TruckScales = new HashSet<TruckScale>();
        }

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

        public virtual CateBusiness? Business { get; set; }
        public virtual CateCounterparty? Counterparty { get; set; }
        public virtual CateMonth? Month { get; set; }
        public virtual CateStore? Store { get; set; }
        public virtual ICollection<MaterialExport> MaterialExports { get; set; }
        public virtual ICollection<ReceiptDetail> ReceiptDetails { get; set; }
        public virtual ICollection<ReceiptImei> ReceiptImeis { get; set; }
        public virtual ICollection<TracingProduct> TracingProducts { get; set; }
        public virtual ICollection<TruckScale> TruckScales { get; set; }
    }
}

