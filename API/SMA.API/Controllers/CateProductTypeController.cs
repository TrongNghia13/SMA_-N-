using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateProductTypeController : ControllerBase
    {
        private readonly ICateProductTypeService _cateProductTypeService;
        private readonly IMapper _mapper;
        public CateProductTypeController(ICateProductTypeService cateProductTypeService, IMapper mapper)
        {
            _cateProductTypeService = cateProductTypeService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateProductTypeService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateProductTypeService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateProductType(CateProductTypeModel cateProductTypeModel)
        {
            var createStatus = await _cateProductTypeService.Create(cateProductTypeModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateProductType(string id, CateProductTypeModel cateProductTypeModel)
        {
            var updateStatus = await _cateProductTypeService.Update(id, cateProductTypeModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateProductType(string id)
        {
            var deleteStatus = await _cateProductTypeService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetTreeGrid")]
        public async Task<IActionResult> GetTreeGrid()
        {
            var value = await _cateProductTypeService.GetTreeGrid();
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpGet("GetDataShowTreeSelect")]
        public async Task<IActionResult> GetDataShowTreeSelect()
        {
            var value = await _cateProductTypeService.GetDataShowTreeSelect();
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
    }
}
