using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CatePlanTypeController : ControllerBase
    {
        private readonly ICatePlanTypeService _catePlanTypeService;
        private readonly IMapper _mapper;
        public CatePlanTypeController(ICatePlanTypeService catePlanTypeService, IMapper mapper)
        {
            _catePlanTypeService = catePlanTypeService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _catePlanTypeService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _catePlanTypeService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCatePlanType(CatePlanTypeModel catePlanTypeModel)
        {
            var createStatus = await _catePlanTypeService.Create(catePlanTypeModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCatePlanType(string id, CatePlanTypeModel catePlanTypeModel)
        {
            var updateStatus = await _catePlanTypeService.Update(id, catePlanTypeModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCatePlanType(string id)
        {
            var deleteStatus = await _catePlanTypeService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}


