using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReceiptDetailModel
    {
        public decimal ReceiptDetailID { get; set; }
        public decimal ReceiptID { get; set; }
        public string? ProductID { get; set; } = null!;
        public string? CalculationUnit { get; set; }
        public decimal Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? TotalWeight1 { get; set; }
        public decimal? TotalWeight2 { get; set; }
        public decimal? TotalWeight3 { get; set; }
        public decimal? FirstWeight { get; set; }
        public decimal? SecondWeight { get; set; }
        public bool? IsImei { get; set; }
        public string? Description { get; set; }
        public int? SortOrder { get; set; }
        public DateTime? CreateDate { get; set; }
    }
    public class ReceiptDetailVmModel : ReceiptDetailModel
    {
        public string? ProductTypeID { get; set; }
        public string? ProductName { get; set; }
        public string? ScaleNo { get; set; }
        public string? ScaleEmployee { get; set; }
        public string? LicensePlate { get; set; }
        public string? ScaleDate { get; set; }
        public int? FirstWeight { get; set; }
        public int? SecondWeight { get; set; }

    }
}

