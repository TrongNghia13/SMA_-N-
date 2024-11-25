using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class TruckScaleController : ControllerBase
    {
        private readonly ITruckScaleService _truckScaleService;
        private readonly IMapper _mapper;
        public TruckScaleController(ITruckScaleService truckScaleService, IMapper mapper)
        {
            _truckScaleService = truckScaleService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _truckScaleService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _truckScaleService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateTruckScale(TruckScaleModel truckScaleModel)
        {
            var createStatus = await _truckScaleService.Create(truckScaleModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateTruckScale(decimal id, TruckScaleModel truckScaleModel)
        {
            var updateStatus = await _truckScaleService.Update(id, truckScaleModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteTruckScale(decimal id)
        {
            var deleteStatus = await _truckScaleService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}



