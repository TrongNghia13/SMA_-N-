using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class TracingProductController : ControllerBase
    {
        private readonly ITracingProductService _tracingProductService;
        private readonly IMapper _mapper;
        public TracingProductController(ITracingProductService tracingProductService, IMapper mapper)
        {
            _tracingProductService = tracingProductService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _tracingProductService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _tracingProductService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateTracingProduct(TracingProductModel tracingProductModel)
        {
            var createStatus = await _tracingProductService.Create(tracingProductModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateTracingProduct(decimal id, TracingProductModel tracingProductModel)
        {
            var updateStatus = await _tracingProductService.Update(id, tracingProductModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteTracingProduct(decimal id)
        {
            var deleteStatus = await _tracingProductService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



