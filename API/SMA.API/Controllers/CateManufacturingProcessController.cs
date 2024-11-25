using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateManufacturingProcessController : ControllerBase
    {


        private readonly ICateManufacturingProcessService _cateManufacturingProcessService;
        private readonly IMapper _mapper;
        public CateManufacturingProcessController(ICateManufacturingProcessService cateManufacturingProcessService, IMapper mapper)
        {
            _cateManufacturingProcessService = cateManufacturingProcessService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateManufacturingProcessService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateManufacturingProcessService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateProductType(CateManufacturingProcessModel cateManufacturingProcessModel)
        {
            var createStatus = await _cateManufacturingProcessService.Create(cateManufacturingProcessModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateProductType(string id, CateManufacturingProcessModel cateManufacturingProcessModel)
        {
            var updateStatus = await _cateManufacturingProcessService.Update(id, cateManufacturingProcessModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateProductType(string id)
        {
            var deleteStatus = await _cateManufacturingProcessService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }

    }
}
