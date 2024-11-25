using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ReceiptDetailFullModel
    {
        public List<ReceiptDetailModel>? listReceiptDetails { get; set; }
        public List<ReceiptImeiWithDefectDetail>? listReceiptImeis { get; set; }

    }
}
