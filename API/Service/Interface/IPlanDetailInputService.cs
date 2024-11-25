using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IPlanDetailInputService
    {
        Task<IEnumerable<PlanDetailInputModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> GetByPlanManuafacturingId(decimal id);
        
        Task<ApiResponeModel> Create(PlanDetailInputModel planDetailInputModel);
        Task<ApiResponeModel> Update(decimal id, PlanDetailInputModel planDetailInputModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
