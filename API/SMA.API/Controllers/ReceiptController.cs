using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly IReceiptService _receiptService;
        private readonly IMapper _mapper;
        public ReceiptController(IReceiptService receiptService, IMapper mapper)
        {
            _receiptService = receiptService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _receiptService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _receiptService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateReceipt(ReceiptModel receiptModel)
        {
            var createStatus = await _receiptService.Create(receiptModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateReceipt(decimal id, ReceiptModel receiptModel)
        {
            var updateStatus = await _receiptService.Update(id, receiptModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteReceipt(decimal id)
        {
            var deleteStatus = await _receiptService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpPost("SearchListReceipt")]
        public async Task<IActionResult> SearchListReceipt(ReceiptSearchModel receiptSearchModel)
        {
            try
            {
                var listValue = await _receiptService.SearchListReceipt(receiptSearchModel);
                return Ok(listValue);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("GetReceiptNoOfReceipt")]
        public async Task<IActionResult> GetReceiptNoOfReceipt(ReceiptSearchModel receiptSearchModel)
        {
            try
            {
                var value = await _receiptService.GetReceiptNoOfReceipt(receiptSearchModel);
                return Ok(value);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetStatisticalMonth")]
        public async Task<IActionResult> GetStatisticalMonth()
        {
            var deleteStatus = await _receiptService.GetStatisticalMonth();
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpPost("GetStatisticalByDate")]
        public async Task<IActionResult> GetStatisticalByDate(ReceiptSearchModel model)
        {
            var deleteStatus = await _receiptService.GetStatisticalByDate(model);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



