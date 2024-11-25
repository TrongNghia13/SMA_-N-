using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Inventory
{
    public class ReciptInputInventoryModel
    {
        public int receiptID { get; set; }
        public string branchID { get; set; }
        public string monthID { get; set; }
        public DateTime receiptDate { get; set; }
        public string receiptType { get; set; }
        public string materialType { get; set; }
        public string receiptNo { get; set; }
        public string sophieu { get; set; }
        public string sohd { get; set; }
        public string licensePlate { get; set; }
        public string businessID { get; set; }
        public string storeID { get; set; }
        public string storeIDc { get; set; }
        public string counterpartyID { get; set; }
        public string productionPlanID { get; set; }
        public string employeeID { get; set; }
        public string receiptContent { get; set; }
        public string httt { get; set; }
        public int unitPrice { get; set; }
        public int ctlq { get; set; }
        public int chkhau { get; set; }
        public int thue { get; set; }
        public bool IsPrintBarCode { get; set; }
        public string createdBy { get; set; }
        public DateTime createdDate { get; set; }
        public string thukho { get; set; }
        public string kyhieukho { get; set; }
        public int quantity { get; set; }
        public string tennv { get; set; }
        public string counterpartyName { get; set; }
        public string kyhieu { get; set; }
        public string counterpartyType { get; set; }
        public string counterpartyGroup { get; set; }
        public object counterpartyAddress { get; set; }
        public string standard { get; set; }
        public string steelType { get; set; }
        public string vendor { get; set; }
        public string productionBatchNo { get; set; }
        public string galvanizedOrganization { get; set; }
        public int steelPrice { get; set; }
        public int congviec { get; set; }
    }
}
