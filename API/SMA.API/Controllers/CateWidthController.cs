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
    public class CateWidthController : ControllerBase
    {
        private readonly ICateWidthService _cateWidthService;
        private readonly IMapper _mapper;
        public CateWidthController(ICateWidthService cateWidthService, IMapper mapper)
        {
            _cateWidthService = cateWidthService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateWidthService.GetAll();
            return Ok(listValue);
        }
        [HttpGet("GetWidthByType/{typeCode}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetWidthByType(string typeCode)
        {
            try
            {
                var listValue = await _cateWidthService.GetWidthByType(typeCode);
                return Ok(listValue);
            }
            catch
            {
                return BadRequest(typeCode);
            }
            
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateWidthService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateWidth(CateWidthModel cateWidthModel)
        {
            var createStatus = await _cateWidthService.Create(cateWidthModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateWidth(string id, CateWidthModel cateWidthModel)
        {
            var updateStatus = await _cateWidthService.Update(id, cateWidthModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateWidth(string id)
        {
            var deleteStatus = await _cateWidthService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
