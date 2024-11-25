using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateProductionPlanService
    {
        Task<IEnumerable<CateProductionPlanModel>> GetListPlanNotFinishByBranchId(string branchId);
        Task<IEnumerable<CateProductionPlanModel>> GetListPlanFinishByBranchId(string branchId);
        Task<IEnumerable<CateProductionPlanModel>> GetListPlanByBranchId(string branchId);
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateProductionPlanModel cateProductionPlanModel);
        Task<ApiResponeModel> Update(string id, CateProductionPlanModel cateProductionPlanModel);
        Task<ApiResponeModel> Delete(string id);
        Task<ApiResponeModel> GetPlanNo(string planDate, string plantTypeId, string branchId);
    }
}
