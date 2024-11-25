using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class PlanDetailInputController : ControllerBase
    {
        private readonly IPlanDetailInputService _planDetailInputService;
        private readonly IMapper _mapper;
        public PlanDetailInputController(IPlanDetailInputService planDetailInputService, IMapper mapper)
        {
            _planDetailInputService = planDetailInputService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _planDetailInputService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _planDetailInputService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }



        [HttpGet("GetByManuafacturingId/{id}")]
        public async Task<IActionResult> GetByManuafacturingId(decimal id)
        {
            var value = await _planDetailInputService.GetByPlanManuafacturingId(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCatePlanDetailInput(PlanDetailInputModel planDetailInputModel)
        {
            var createStatus = await _planDetailInputService.Create(planDetailInputModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCatePlanDetailInput(decimal id, PlanDetailInputModel planDetailInputModel)
        {
            var updateStatus = await _planDetailInputService.Update(id, planDetailInputModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCatePlanDetailInput(decimal id)
        {
            var deleteStatus = await _planDetailInputService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



