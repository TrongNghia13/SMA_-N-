using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class ProductImeiSteelDefectModel
    {
        public ProductImeiModel productImeiModel { get; set; }
        public IEnumerable<SteelDefectDetailModel> steelDefectDetailModels { get; set; }   
    }
}
