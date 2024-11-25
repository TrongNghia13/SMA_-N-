using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class LoginModel
    {
        public string userName { get; set; }
		public string password { get; set; }
		public string branchId { get; set; }
        public string? newPassword { get; set; }

	}
}
