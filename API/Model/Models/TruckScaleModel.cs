using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class TruckScaleModel
    {
        public decimal TruckScaleID { get; set; }
        public decimal? ReceiptID { get; set; }
        public DateTime? ScaleDate { get; set; }
        public string? ScaleNo { get; set; }
        public string? LicensePlate { get; set; }
        public string? ScaleEmployee { get; set; }
        public int? FirstWeight { get; set; }
        public int? SecondWeight { get; set; }
        public int? VolumeGoods { get; set; }
    }
}
