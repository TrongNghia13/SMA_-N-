using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public partial class CateJobTitle
    {
        public CateJobTitle()
        {
            Employees = new HashSet<Employee>();
        }

        public int JobTitleID { get; set; }
        public string? JobTitleName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
