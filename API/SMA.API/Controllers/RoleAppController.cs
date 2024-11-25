using AutoMapper;
using DATA;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class RoleAppController : ControllerBase
    {
        private readonly IRoleAppService _RoleAppService;
        private readonly IMapper _mapper;
        public RoleAppController(IRoleAppService RoleAppService, IMapper mapper)
        {
            _RoleAppService = RoleAppService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _RoleAppService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _RoleAppService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateRoleApp(RoleAppModel RoleAppModel)
        {
            var createStatus = await _RoleAppService.Create(RoleAppModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateRoleApp(int id, RoleAppModel RoleAppModel)
        {
            var updateStatus = await _RoleAppService.Update(id, RoleAppModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRoleApp(int id)
        {
            var deleteStatus = await _RoleAppService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("TreeAppByRole/{id}")]
        public async Task<IActionResult> TreeAppByRole(int id)
        {
            var value = await _RoleAppService.TreeAppByRole(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpPost("RoleAppManagerByList")]
        public async Task<IActionResult> RoleAppManagerByList(List<RoleApp> listRole)
        {
            var value = await _RoleAppService.RoleAppManagerByList(listRole);
            return Ok(value);
        }
    }
}
