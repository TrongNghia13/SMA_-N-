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
    public class CateSteelDefectController : ControllerBase
    {


        private readonly ICateSteelDefect _cateSteelDefect;
        private readonly IMapper _mapper;
        public CateSteelDefectController(ICateSteelDefect cateSteelDefect, IMapper mapper)
        {
            _cateSteelDefect = cateSteelDefect;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateSteelDefect.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _cateSteelDefect.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateSteelDefect(CateSteelDefectModel cateSteelDefectModel)
        {
            var createStatus = await _cateSteelDefect.Create(cateSteelDefectModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateSteelDefect(int id, CateSteelDefectModel cateSteelDefectModel)
        {
            var updateStatus = await _cateSteelDefect.Update(id, cateSteelDefectModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateSteelDefect(int id)
        {
            var deleteStatus = await _cateSteelDefect.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetAllRollDefect")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllRollDefect()
        {
            var listValue = await _cateSteelDefect.GetAllRollDefect();
            return Ok(listValue);
        }
        [HttpGet("GetAllTapeDefect")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllTapeDefect()
        {
            var listValue = await _cateSteelDefect.GetAllTapeDefect();
            return Ok(listValue);
        }
        [HttpGet("GetListDefectByMarterialType/{marterialType}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListDefectByMarterialType(string marterialType)
        {
            var value = await _cateSteelDefect.GetListDefectByMarterialType(marterialType);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpGet("GetAllListDefect")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllListDefect()
        {
            var value = await _cateSteelDefect.GetAllListDefect();
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
    }
}
