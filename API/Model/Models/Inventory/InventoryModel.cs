using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Inventory
{


    public class InventoryModel
    {
        public ReceiptVmModel receipt { get; set; }
        public List<ReceiptDetailVmModel> lstReceiptDetail { get; set; }
        public List<ReceiptImeiWithDefectDetail> lstReceiptImei { get; set; }
       
        
     
    }
}
