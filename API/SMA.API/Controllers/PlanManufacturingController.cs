using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Model.Models.PlanManuafacturing;
using Service.Interface;
using static Model.Models.PlanManuafacturing.PlanManufacturingWithInputModels;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class PlanManufacturingController : ControllerBase
    {
        private readonly IPlanManufacturingSerivce _planManufacturingService;
        private readonly IMapper _mapper;
        public PlanManufacturingController(IPlanManufacturingSerivce planManufacturingSerivce, IMapper mapper)
        {
            _planManufacturingService = planManufacturingSerivce;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _planManufacturingService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _planManufacturingService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [HttpGet("GetPlanNo/{branchID}/{ReceiptType}/{MonthId}")]
        public async Task<IActionResult> GetPlanNo(string branchID, string ReceiptType, string MonthId)
        {
            var value = await _planManufacturingService.GetPlanNo(branchID,ReceiptType, MonthId);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
       


        [HttpGet("GetByPlanProductionId/{id}")]
        public async Task<IActionResult> GetByPlanProductionId(string id)
        {
            id=Uri.UnescapeDataString(id);
            var value = await _planManufacturingService.GetByProductionPlanId(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [HttpGet("GetInStockMaterial/{id}")]
        public async Task<IActionResult> GetInStockMaterialByPlanProductionId(string id)
        {
            id = Uri.UnescapeDataString(id);
            var value = await _planManufacturingService.GetInStockMaterial(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }


        [HttpGet("GetInventoryMaterialNotManuafacturing/{id}&{branchId}")]
        public async Task<IActionResult> GetInventoryMaterialNotManuafacturing(string id, string branchId)
        {
            id = Uri.UnescapeDataString(id);
            var value = await _planManufacturingService.GetInventoryMaterialNotManuafacturing(id, branchId);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [HttpGet("GetInventoryMaterialNotMaterialInput/{id}&{ProductionPlanId}")]
        public async Task<IActionResult> GetInventoryMaterialNotMaterialInput(string id, string ProductionPlanId)
        {
            ProductionPlanId = Uri.UnescapeDataString(ProductionPlanId);
            var value = await _planManufacturingService.GetInventoryMaterialNotMaterialInput(id, ProductionPlanId);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [HttpGet("GetPlanRoll/{isFinish}&{branchId}")]
        public async Task<IActionResult> GetPlanRoll(int isFinish, string branchId)
        {
            var value = await _planManufacturingService.GetPlanRoll(isFinish, branchId);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }


        [HttpGet("GetPlanScaleRollManuafacturing/{isFinish}&{branchId}")]
        public async Task<IActionResult> GetPlanScaleRollManuafacturing(int isFinish, string branchId)
        {

            var value = await _planManufacturingService.GetPlanScaleRollManuafacturing(isFinish, branchId);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }




        [ActionName("Update")]
        [HttpPost]
        public async Task<IActionResult> Update(PlanManufacturingWithInputModel planManufacturingWithInputModel)
        {
            var createStatus = await _planManufacturingService.INS_UPS(planManufacturingWithInputModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

       
        [HttpPost("ScaleProduct")]
        public async Task<IActionResult> ScaleProduct(List<ScaleProductModel> lsScaleProductModel)
        {
            var createStatus = await _planManufacturingService.Scale_Product(lsScaleProductModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeletePlanManufacturing(decimal id)
        {
            var deleteStatus = await _planManufacturingService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



