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
    public class CateStoreTypeController : ControllerBase
    {
        private readonly ICateStoreTypeService _cateStoreTypeService;
        private readonly IMapper _mapper;
        public CateStoreTypeController(ICateStoreTypeService cateStoreTypeService, IMapper mapper)
        {
            _cateStoreTypeService = cateStoreTypeService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateStoreTypeService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateStoreTypeService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateStoreType(CateStoreTypeModel cateStoreTypeModel)
        {
            var createStatus = await _cateStoreTypeService.Create(cateStoreTypeModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateStoreType(string id, CateStoreTypeModel cateStoreTypeModel)
        {
            var updateStatus = await _cateStoreTypeService.Update(id, cateStoreTypeModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateStoreType(string id)
        {
            var deleteStatus = await _cateStoreTypeService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
