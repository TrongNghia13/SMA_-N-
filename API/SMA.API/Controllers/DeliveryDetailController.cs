using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class DeliveryDetailController : ControllerBase
    {
        private readonly IDeliveryDetailService _deliveryDetailService;
        private readonly IMapper _mapper;
        public DeliveryDetailController(IDeliveryDetailService deliveryDetailService , IMapper mapper)
        {
            _deliveryDetailService = deliveryDetailService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _deliveryDetailService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _deliveryDetailService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateDeliveryDetail(DeliveryDetailModel deliveryDetailModel)
        {
            var createStatus = await _deliveryDetailService.Create(deliveryDetailModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateDeliveryDetail(decimal id, DeliveryDetailModel deliveryDetailModel)
        {
            var updateStatus = await _deliveryDetailService.Update(id, deliveryDetailModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteDeliveryDetail(decimal id)
        {
            var deleteStatus = await _deliveryDetailService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



