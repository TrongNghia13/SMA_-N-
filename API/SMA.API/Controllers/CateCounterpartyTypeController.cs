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
    public class CateCounterpartyTypeController : ControllerBase
    {
        private readonly ICateCounterpartyTypeService _cateCounterpartyTypeService;
        private readonly IMapper _mapper;
        public CateCounterpartyTypeController(ICateCounterpartyTypeService cateCounterpartyTypeService, IMapper mapper)
        {
            _cateCounterpartyTypeService = cateCounterpartyTypeService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateCounterpartyTypeService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateCounterpartyTypeService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateCounterpartyType(CateCounterpartyTypeModel cateCounterpartyTypeModel)
        {
            var createStatus = await _cateCounterpartyTypeService.Create(cateCounterpartyTypeModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateCounterpartyType(string id, CateCounterpartyTypeModel cateCounterpartyTypeModel)
        {
            var updateStatus = await _cateCounterpartyTypeService.Update(id, cateCounterpartyTypeModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateCounterpartyType(string id)
        {
            var deleteStatus = await _cateCounterpartyTypeService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
