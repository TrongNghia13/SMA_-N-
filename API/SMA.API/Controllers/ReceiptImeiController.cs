using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class ReceiptImeiController : ControllerBase
    {
        private readonly IReceiptImeiService _receiptImeiService;
        private readonly IMapper _mapper;
        public ReceiptImeiController(IReceiptImeiService receiptImeiService, IMapper mapper)
        {
            _receiptImeiService = receiptImeiService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _receiptImeiService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _receiptImeiService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateReceiptImei(ReceiptImeiModel receiptImeiModel)
        {
            var createStatus = await _receiptImeiService.Create(receiptImeiModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateReceiptImei(decimal id, ReceiptImeiModel receiptImeiModel)
        {
            var updateStatus = await _receiptImeiService.Update(id, receiptImeiModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteReceiptImei(decimal id)
        {
            var deleteStatus = await _receiptImeiService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetRollByImei/{imei}")]
        public async Task<IActionResult> GetRollByImei(string imei)
        {
            var value = await _receiptImeiService.GetRollByImei(imei);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpGet("GetTapeByImei/{imei}")]
        public async Task<IActionResult> GetTapeByImei(string imei)
        {
            var value = await _receiptImeiService.GetTapeByImei(imei);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
    }
}



