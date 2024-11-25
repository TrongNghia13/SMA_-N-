using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IPlanDetailOutputService
    {
        Task<IEnumerable<PlanDetailOutputModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> GetByMaNuaFacturingID(decimal id);
        
        Task<ApiResponeModel> Create(PlanDetailOutputModel planDetailOutputModel);
        Task<ApiResponeModel> Update(decimal id, PlanDetailOutputModel planDetailOutputModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
