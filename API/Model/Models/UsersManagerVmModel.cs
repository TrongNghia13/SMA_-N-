using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class UsersManagerVmModel
    {
        public UserModel User { get; set; }
        public List<int?>? RoleForUser { get; set; }
        public List<string?>? BranchForUser { get; set; }
    }
}
