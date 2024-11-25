using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Inventory
{
    public class ListReciptImeiInventoryModel
    {
        public List<ReciptImeiInventoryModel> reciptImeiInventoryModel { get; set; }
        public class ReciptImeiInventoryModel
        {
            public int receiptImeiID { get; set; }
            public int receiptID { get; set; }
            public int receiptDetailID { get; set; }
            public string productID { get; set; }
            public int quantity { get; set; }
            public string standard { get; set; }
            public string steelType { get; set; }
            public string vendor { get; set; }
            public string productionBatchNo { get; set; }
            public string galvanizedOrganization { get; set; }
            public string steelPrice { get; set; }
            public string thickness { get; set; }
            public string width { get; set; }
            public string weight { get; set; }
            public string imei { get; set; }
            public string specification { get; set; }
            public string description { get; set; }
            public int sortOrder { get; set; }
            public int parentID { get; set; }
            public int weight1 { get; set; }
            public int weight2 { get; set; }
            public int weight3 { get; set; }
            public string image { get; set; }
            public string image2 { get; set; }
            public string image3 { get; set; }
            public int workProcessID { get; set; }
            public string createdDate { get; set; }
            public List<ListSteelDefectDetailInventoryModel> listSteelDefectDetailInventoryModel { get; set; }
        }
    }
}
