using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateMonthController : ControllerBase
    {


        private readonly ICateMonthService _cateMonthService;
        public CateMonthController(ICateMonthService cateMonthService)
        {
            _cateMonthService = cateMonthService;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateMonthService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateMonthService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateMonth(CateMonthModel cateMonthModel)
        {
            var createStatus = await _cateMonthService.Create(cateMonthModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("UpdateMonth")]

        public async Task<IActionResult> UpdateCateMonth( CateMonthModel cateMonthModel)
        {
            var updateStatus = await _cateMonthService.Update( cateMonthModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateMonth(string id)
        {
            var deleteStatus = await _cateMonthService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("CheckMonthIsOpen/{receiptDate}")]
        public async Task<IActionResult> CheckMonthIsOpen(string receiptDate)
        {
            var value = await _cateMonthService.CheckMonthIsOpen(receiptDate);
            return Ok(value);
        }
    }
}
