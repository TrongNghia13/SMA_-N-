using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
	[Table("Errors")]
	public class ErrorModel
	{
		
			public int ID { set; get; }
			public string Message { set; get; }
			public string StackTrace { set; get; }
			public DateTime CreatedDate { set; get; }
		
	}
}
