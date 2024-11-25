using DATA;
using Model.Models;
using Model.Models.PlanManuafacturing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Model.Models.PlanManuafacturing.PlanManufacturingWithInputModels;

namespace Service.Interface
{
    public interface IPlanManufacturingSerivce
    {
        Task<IEnumerable<PlanManufacturingModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> GetByProductionPlanId(string productionPlanId);
        Task<ApiResponeModel> GetInStockMaterial(string productionPlanId);
        Task<ApiResponeModel> GetPlanRoll(int isFinish, string branchId);
        Task<ApiResponeModel> GetPlanNo(string branchID, string ReceiptType, string MonthId);
        Task<ApiResponeModel> GetInventoryMaterialNotManuafacturing(string productionPlanId, string branchId);
        Task<ApiResponeModel> GetInventoryMaterialNotMaterialInput(string MaterialType, string ProductionPlanID);
        Task<ApiResponeModel> GetPlanScaleRollManuafacturing(int isFinish, string branchId);
        Task<ApiResponeModel> INS_UPS(PlanManufacturingWithInputModel planManufacturingWithInputModel);
        Task<ApiResponeModel> Scale_Product(List<ScaleProductModel> lsScaleProductModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
