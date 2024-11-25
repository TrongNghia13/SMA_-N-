using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Inventory
{
    public class ListReciptDetailInventoryModel {
        public List<ReciptDetailInventoryModel> reciptDetailInventoryModels { get; set; }   
        public class ReciptDetailInventoryModel
        {
            public int receiptDetailID { get; set; }
            public int receiptID { get; set; }
            public string productID { get; set; }
            public string calculationUnit { get; set; }
            public int quantity { get; set; }
            public int unitPrice { get; set; }
            public int totalAmount { get; set; }
            public int weight { get; set; }
            public int totalWeight1 { get; set; }
            public int totalWeight2 { get; set; }
            public int totalWeight3 { get; set; }
            public bool isImei { get; set; }
            public string description { get; set; }
            public DateTime createDate { get; set; }
            public string productTypeID { get; set; }
            public string productName { get; set; }
            public bool vuotton { get; set; }
            public int index { get; set; }
        }
    }
}
