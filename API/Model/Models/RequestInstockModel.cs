using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public  class RequestInstockModel
    {
        public string? MaterialType { get; set; }
        public string? StoreTypeId { get; set; }
        public string? BranchId { get; set; }
        public string? ProductId { get; set; }
        public string? MonthId { get; set; }


    }
}
