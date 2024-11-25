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
    public class CateSteelTypeController : ControllerBase
    {
        private readonly ICateSteelTypeService _CateSteelTypeService;
        private readonly IMapper _mapper;
        public CateSteelTypeController(ICateSteelTypeService CateSteelTypeService, IMapper mapper)
        {
            _CateSteelTypeService = CateSteelTypeService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _CateSteelTypeService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _CateSteelTypeService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateSteelType(CateSteelTypeModel CateSteelTypeModel)
        {
            var createStatus = await _CateSteelTypeService.Create(CateSteelTypeModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateSteelType(string id, CateSteelTypeModel CateSteelTypeModel)
        {
            var updateStatus = await _CateSteelTypeService.Update(id, CateSteelTypeModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateSteelType(string id)
        {
            var deleteStatus = await _CateSteelTypeService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
