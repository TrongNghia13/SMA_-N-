using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class UploadTaskRequestModel
    {
        public TaskDeliverAppModel? taskDeliverAppModel { get; set; }
        public List<TaskDeliverDetailModel>? listTaskDeliverDetailModel { get; set; }
    }
}
