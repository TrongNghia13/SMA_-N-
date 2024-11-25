using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateProductTypeTreeModel : CateProductTypeModel
    {
        public string? Key { get; set; }
        public List<CateProductTypeTreeModel>? Children { get; set; }
    }
}
