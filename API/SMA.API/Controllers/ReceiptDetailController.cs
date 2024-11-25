using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class ReceiptDetailController : ControllerBase
    {
        private readonly IReceiptDetailService _receiptDetailService;
        private readonly IMapper _mapper;
        public ReceiptDetailController(IReceiptDetailService receiptDetailService, IMapper mapper)
        {
            _receiptDetailService = receiptDetailService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _receiptDetailService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _receiptDetailService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateReceiptDetail(ReceiptDetailModel receiptDetailModel)
        {
            var createStatus = await _receiptDetailService.Create(receiptDetailModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateReceiptDetail(decimal id, ReceiptDetailModel receiptDetailModel)
        {
            var updateStatus = await _receiptDetailService.Update(id, receiptDetailModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteReceiptDetail(decimal id)
        {
            var deleteStatus = await _receiptDetailService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetReceiptDetailFull/{receiptId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetReceiptDetailFull(decimal receiptId)
        {
             var getStatus = await _receiptDetailService.GetReceiptDetailFull(receiptId);
            if (getStatus == null || !getStatus.Success)
            {
                return NotFound(getStatus);
            }
            return Ok(getStatus);
        }
    }
}



