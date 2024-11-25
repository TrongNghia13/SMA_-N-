using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ITaskDeliverAppService
    {
        Task<IEnumerable<TaskDeliverAppModel>> GetListTaskDeliverAppByBranchId(string branchId, string fromDate, string toDate,string steelType);
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(TaskDeliverAppModel taskDeliverAppModel);
        Task<ApiResponeModel> Update(decimal id, TaskDeliverAppModel taskDeliverAppModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<IEnumerable<TaskDeliverAppModel>> GetListByUsername(string username, string branchId, string materialType);
        //Task<IEnumerable<TaskDeliverAppModel>> GetListTapeByUsername(string username);
        Task<ApiResponeModel> GetReceiptNoTaskApp(string planType, string dateReceipt);
        Task<IEnumerable<ProductImeiModel>> GetListProductImeiByPlanId(string planId);
    }
}
