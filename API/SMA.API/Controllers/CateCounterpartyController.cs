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
    public class CateCounterpartyController : ControllerBase
    {
        private readonly ICateCounterpartyService _CateCounterpartyService;
        private readonly IMapper _mapper;
        public CateCounterpartyController(ICateCounterpartyService CateCounterpartyService, IMapper mapper)
        {
            _CateCounterpartyService = CateCounterpartyService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var value = await _CateCounterpartyService.GetAll();
            return Ok(value);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _CateCounterpartyService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateCounterparty(CateCounterpartyModel CateCounterpartyModel)
        {
            var createStatus = await _CateCounterpartyService.Create(CateCounterpartyModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateCounterparty(string id, CateCounterpartyModel CateCounterpartyModel)
        {
            var updateStatus = await _CateCounterpartyService.Update(id, CateCounterpartyModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateCounterparty(string id)
        {
            var deleteStatus = await _CateCounterpartyService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetVendorByGroupId/{groupId}")]
        public async Task<IActionResult> GetVendorByGroupId(string groupId)
        {
            try
            {
                var value = await _CateCounterpartyService.GetVendorByGroupId(groupId);
                return Ok(value);
            }
            catch
            {
                return NotFound(groupId);
            }

        }
        [HttpGet("GetListCouterByTypeAndGroup/{typeId}&{groupId}")]
        public async Task<IActionResult> GetListCouterByTypeAndGroup(string typeId,string groupId)
        {
            try
            {
                var value = await _CateCounterpartyService.GetListCouterByTypeAndGroup(typeId, groupId);
                return Ok(value);
            }
            catch
            {
                return NotFound(groupId);
            }

        }
    }
}
