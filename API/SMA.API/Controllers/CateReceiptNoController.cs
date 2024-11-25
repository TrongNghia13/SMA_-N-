using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateReceiptNoController : ControllerBase
    {
        private readonly ICateReceiptNoService _cateReceiptNoService;
        private readonly IMapper _mapper;
        public CateReceiptNoController(ICateReceiptNoService cateReceiptNoService, IMapper mapper)
        {
            _cateReceiptNoService = cateReceiptNoService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateReceiptNoService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateReceiptNoService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateReceiptNo(CateReceiptNoModel cateReceiptNoModel)
        {
            var createStatus = await _cateReceiptNoService.Create(cateReceiptNoModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateReceiptNo(string id, CateReceiptNoModel cateReceiptNoModel)
        {
            var updateStatus = await _cateReceiptNoService.Update(id, cateReceiptNoModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateReceiptNo(string id)
        {
            var deleteStatus = await _cateReceiptNoService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



