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
    public class CateStoreController : ControllerBase
    {
        private readonly ICateStoreService _cateStoreService;
        private readonly IMapper _mapper;
        public CateStoreController(ICateStoreService cateStoreService, IMapper mapper)
        {
            _cateStoreService = cateStoreService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateStoreService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateStoreService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateStore(CateStoreModel cateStoreModel)
        {
            var createStatus = await _cateStoreService.Create(cateStoreModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateStore(string id, CateStoreModel cateStoreModel)
        {
            var updateStatus = await _cateStoreService.Update(id, cateStoreModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateStore(string id)
        {
            var deleteStatus = await _cateStoreService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetStoreByTypeBranch/{typeId}&{branchId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetStoreByTypeBranch(string typeId = "0", string branchId = "0")
        {
            var listValue = await _cateStoreService.GetStoreByTypeBranch(typeId, branchId);
            return Ok(listValue);
        }
    }
}
