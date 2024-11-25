using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class CateCounterpartyGroupTreeDataModel : CateCounterpartyGroupModel
    {
        public string? Key { get; set; }
        public List<CateCounterpartyGroupTreeDataModel>? Children { get; set; }
    }
}
