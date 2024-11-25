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
    public class CateCounterpartyGroupController : ControllerBase
    {
        private readonly ICateCounterpartyGroupService _cateCounterpartyGroupService;
        private readonly IMapper _mapper;
        public CateCounterpartyGroupController(ICateCounterpartyGroupService cateCounterpartyTypeService, IMapper mapper)
        {
            _cateCounterpartyGroupService = cateCounterpartyTypeService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var value = await _cateCounterpartyGroupService.GetAll();
            return Ok(value);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateCounterpartyGroupService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateCounterpartyType(CateCounterpartyGroupModel cateCounterpartyGroupModel)
        {
            var createStatus = await _cateCounterpartyGroupService.Create(cateCounterpartyGroupModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateCounterpartyType(string id, CateCounterpartyGroupModel CateCounterpartyGroupModel)
        {
            var updateStatus = await _cateCounterpartyGroupService.Update(id, CateCounterpartyGroupModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateCounterpartyType(string id)
        {
            var deleteStatus = await _cateCounterpartyGroupService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetListCounterPartyGroup/{type}&{isChild}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListCounterPartyGroup(string type, bool isChild)
        {
            var value = await _cateCounterpartyGroupService.GetListCounterPartyGroup(type,isChild);
            return Ok(value);
        }
        [HttpGet("GetListTreeGridCounterGroup/{typeId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListTreeGridCounterGroup(string? typeId)
        {
            var value = await _cateCounterpartyGroupService.GetListTreeGridCounterGroup(typeId);
            return Ok(value);
        }
    }
}
