using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class Image
    {
        public long ImageId { get; set; }
        public string? Url { get; set; }
        public string? ItemId { get; set; }
        public bool? IsDelete { get; set; }
    }
}
