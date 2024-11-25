using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateProductController : ControllerBase
    {
        private readonly ICateProduct _cateProductService;
        private readonly IMapper _mapper;
        public CateProductController(ICateProduct cateProductService, IMapper mapper)
        {
            _cateProductService = cateProductService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateProductService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateProductService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateProduct(CateProductModel cateProductModel)
        {
            var createStatus = await _cateProductService.Create(cateProductModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateProduct(string id, CateProductModel cateProductModel)
        {
            var updateStatus = await _cateProductService.Update(id, cateProductModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateProduct(string id)
        {
            var deleteStatus = await _cateProductService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpPost("GetListCateProduct")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListCateProduct(CateProductModel cateProductModel)
        {
            try
            {
                var listValue = await _cateProductService.GetListCateProduct(cateProductModel);
                return Ok(listValue);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("GetAutoProductID")]
        public async Task<IActionResult> GetAutoProductID(CateProductTypeModel model)
        {
            var value = await _cateProductService.GetAutoProductID(model);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
    }
}

