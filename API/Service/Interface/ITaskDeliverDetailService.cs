using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ITaskDeliverDetailService
    {
        Task<IEnumerable<TaskDeliverDetailModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(TaskDeliverDetailModel taskDeliverDetailModel);
        Task<ApiResponeModel> Update(decimal id, TaskDeliverDetailModel taskDeliverDetailModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<ApiResponeModel> UploadTaskRequest(UploadTaskRequestModel uploadTaskRequestModel);
    }
}
