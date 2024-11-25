using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Inventory
{
    public class ListSteelDefectDetailInventoryModel
    {
        public int main { get; set; }
        public string createdBy { get; set; }
        public string createdDate { get; set; }
        public string imei { get; set; }
        public int option1 { get; set; }
        public int option2 { get; set; }
        public int option3 { get; set; }
        public int option4 { get; set; }
        public string steelDefectName { get; set; }
        public int steelDefectDetailID { get; set; }
    }
}
