using AutoMapper;
using DATA;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateProductionPlanController : ControllerBase
    {
        private readonly ICateProductionPlanService _cateProductionPlanService;
        private readonly IMapper _mapper;
        public CateProductionPlanController(ICateProductionPlanService cateProductionPlanService, IMapper mapper)
        {
            _cateProductionPlanService = cateProductionPlanService;
            _mapper = mapper;
        }
        [HttpGet("GetPlanNo/{planDate}&{plantTypeId}&{branchId}")]
        public async Task<IActionResult> GetPlanNo(string planDate, string plantTypeId, string branchId)
        {
            var status = await _cateProductionPlanService.GetPlanNo(planDate,plantTypeId,branchId);
            if (status == null || !status.Success)
            {
                return NotFound(status);
            }
            return Ok(status);
        }

        [HttpGet("GetListPlanNotFinishByBranchId/{branchId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListPlanNotFinishByBranchId(string branchId)
        {
            var listValue = await _cateProductionPlanService.GetListPlanNotFinishByBranchId(branchId);
            return Ok(listValue);
        }
        [HttpGet("GetListPlanFinishByBranchId/{branchId}")]
        public async Task<IActionResult> GetListPlanFinishByBranchId(string branchId)
        {
            var listValue = await _cateProductionPlanService.GetListPlanFinishByBranchId(branchId);
            return Ok(listValue);
        }
        [HttpGet("GetListPlanByBranchId/{branchId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListPlanByBranchId(string branchId)
        {
            var listValue = await _cateProductionPlanService.GetListPlanByBranchId(branchId);
            return Ok(listValue);
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateProductionPlanService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateProductionPlan(CateProductionPlanModel cateProductionPlanModel)
        {
            var createStatus = await _cateProductionPlanService.Create(cateProductionPlanModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateProductionPlan(string id, CateProductionPlanModel cateProductionPlanModel)
        {
            var updateStatus = await _cateProductionPlanService.Update(id, cateProductionPlanModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateProductionPlan(string id)
        {
            var deleteStatus = await _cateProductionPlanService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }

       
    }
}


