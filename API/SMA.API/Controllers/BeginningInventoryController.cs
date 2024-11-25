using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class BeginningInventoryController : ControllerBase
    {
        private readonly IBeginningInventoryService _beginningInventoryService;
        private readonly IInventoryMaterial _inventoryMaterial;
        private readonly IMapper _mapper;
        public BeginningInventoryController(IBeginningInventoryService beginningInventoryService, IInventoryMaterial inventoryMaterial, IMapper mapper)
        {
            _beginningInventoryService = beginningInventoryService;
            _inventoryMaterial = inventoryMaterial;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _beginningInventoryService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _beginningInventoryService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [HttpPost("GetInventoryMaterial")]
        public async Task<IActionResult> GetInventoryMaterial(RequestInstockModel requestInstockModel)
        { 
            var value = await _inventoryMaterial.GetInventoryMaterial(requestInstockModel);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [HttpPost("GetImeiInventoryMaterial")]
        public async Task<IActionResult> GetImeiInventoryMaterial(RequestInstockModel requestInstockModel)
        {
            var value = await _inventoryMaterial.GetImeiInventoryMaterial(requestInstockModel);
            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateBeginningInventory(BeginningInventoryModel beginningInventoryModel)
        {
            var createStatus = await _beginningInventoryService.Create(beginningInventoryModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateBeginningInventory(decimal id, BeginningInventoryModel beginningInventoryModel)
        {
            var updateStatus = await _beginningInventoryService.Update(id, beginningInventoryModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteBeginningInventory(decimal id)
        {
            var deleteStatus = await _beginningInventoryService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



