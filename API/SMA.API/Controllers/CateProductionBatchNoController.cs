using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CateProductionBatchNoController : ControllerBase
    {
        private readonly ICateProductionBatchNoService _cateProductionBatchNoService;
        private readonly IMapper _mapper;
        public CateProductionBatchNoController(ICateProductionBatchNoService cateProductionBatchNoService, IMapper mapper)
        {
            _cateProductionBatchNoService = cateProductionBatchNoService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateProductionBatchNoService.GetAll();
            try
            {
                listValue = listValue.OrderBy(c => int.Parse(c.ProductionBatchNoID));
            }
            catch
            {
                return Ok(listValue);
            }
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateProductionBatchNoService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateProductionBatchNo( CateProductionBatchNoModel cateProductionBatchNoModel) { 
            var createStatus = await _cateProductionBatchNoService.Create(cateProductionBatchNoModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateProductionBatchNo(string id, CateProductionBatchNoModel cateProductionBatchNoModel)
        {
            var updateStatus = await _cateProductionBatchNoService.Update(id, cateProductionBatchNoModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteProductionBatchNo(string id)
        {
            var deleteStatus = await _cateProductionBatchNoService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
