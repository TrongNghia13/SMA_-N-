using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateJobTitleController : ControllerBase
    {
        private readonly ICateJobTitleService _CateJobTitleService;
        private readonly IMapper _mapper;
        public CateJobTitleController(ICateJobTitleService CateJobTitleService, IMapper mapper)
        {
            _CateJobTitleService = CateJobTitleService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var value = await _CateJobTitleService.GetAll();
            return Ok(value);
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _CateJobTitleService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateJobTitle(CateJobTitleModel CateJobTitleModel)
        {
            var createStatus = await _CateJobTitleService.Create(CateJobTitleModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateJobTitle(int id, CateJobTitleModel CateJobTitleModel)
        {
            var updateStatus = await _CateJobTitleService.Update(id, CateJobTitleModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateJobTitle(int id)
        {
            var deleteStatus = await _CateJobTitleService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
