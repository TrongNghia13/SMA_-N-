using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Model.Models
{
        public class UserBranchModel
        {
        public int UserBranchID { get; set; }
        public int? UserID { get; set; }
        public string? BranchID { get; set; }
    }
    }

