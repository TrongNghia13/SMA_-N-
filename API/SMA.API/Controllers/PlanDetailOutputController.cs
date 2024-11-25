using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class PlanDetailOutputController : ControllerBase
    {
        private readonly IPlanDetailOutputService _planDetailOutputService;
        private readonly IMapper _mapper;
        public PlanDetailOutputController(IPlanDetailOutputService planDetailOutputService, IMapper mapper)
        {
            _planDetailOutputService = planDetailOutputService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _planDetailOutputService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _planDetailOutputService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);
            return Ok(value);
        }

        [HttpGet("GetByManuFactuaringId/{id}")]
        public async Task<IActionResult> GetByManuFactuaringId(decimal id)
        {
            var value = await _planDetailOutputService.GetByMaNuaFacturingID(id);
            if (value == null || !value.Success)
                return NotFound(value);
            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCatePlanDetailOutput(PlanDetailOutputModel planDetailOutputModel)
        {
            var createStatus = await _planDetailOutputService.Create(planDetailOutputModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCatePlanDetailOutput(decimal id, PlanDetailOutputModel planDetailOutputModel)
        {
            var updateStatus = await _planDetailOutputService.Update(id, planDetailOutputModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCatePlanDetailOutput(decimal id)
        {
            var deleteStatus = await _planDetailOutputService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



