using AutoMapper;
using DATA;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class SteelDefectDetailController : ControllerBase
    {
        private readonly ISteelDefectDetailService _steelDefectDetailService;
        private readonly IMapper _mapper;
        public SteelDefectDetailController(ISteelDefectDetailService steelDefectDetailService, IMapper mapper)
        {
            _steelDefectDetailService = steelDefectDetailService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _steelDefectDetailService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _steelDefectDetailService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        //[ActionName("Create")]
        //[HttpPost]
        //public async Task<IActionResult> CreateSteelDefectDetail(SteelDefectDetailModel steelDefectDetailModel)
        //{
        //    var createStatus = await _steelDefectDetailService.Create(steelDefectDetailModel);
        //    if (createStatus == null || !createStatus.Success)
        //    {
        //        return BadRequest(createStatus);
        //    }
        //    return Ok(createStatus);
        //}

        [ActionName("Insert")]
        [HttpPost]
        public async Task<IActionResult> InsertSteelDefectDetail(ProductImeiSteelDefectModel productImeiSteelDefectModels)
        {
            var createStatus = await _steelDefectDetailService.Insert(productImeiSteelDefectModels);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }
        [HttpPost("UpdateProductImeiSteelDefect")]
        public async Task<IActionResult> UpdateProductImeiSteelDefect(ProductImeiSteelDefectModel productImeiSteelDefectModels)
        {
            var createStatus = await _steelDefectDetailService.Insert(productImeiSteelDefectModels);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }
        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateSteelDefectDetail(decimal id, SteelDefectDetailModel steelDefectDetailModel)
        {
            var updateStatus = await _steelDefectDetailService.Update(id, steelDefectDetailModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteSteelDefectDetail(decimal id)
        {
            var deleteStatus = await _steelDefectDetailService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetListDefectByImei/{imei}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListDefectByImei(string imei)
        {
            var listValue = await _steelDefectDetailService.GetListDefectByImei(imei);
            return Ok(listValue);
        }
        [HttpPost("DeleteAllDefectByImei")]
        public async Task<IActionResult> DeleteAllDefectByImei(ProductImeiModel productImei)
        {
            var deleteStatus = await _steelDefectDetailService.DeleteAllDefectByImei(productImei);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



