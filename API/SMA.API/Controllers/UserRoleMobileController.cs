using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class UserRoleMobileController : ControllerBase
    {
        private readonly IUserRoleMobileService _UserRoleMobileService;
        private readonly IMapper _mapper;
        public UserRoleMobileController(IUserRoleMobileService UserRoleMobileService, IMapper mapper)
        {
            _UserRoleMobileService = UserRoleMobileService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _UserRoleMobileService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _UserRoleMobileService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateUserRoleMobile(UserRoleMobileModel UserRoleMobileModel)
        {
            var createStatus = await _UserRoleMobileService.Create(UserRoleMobileModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateUserRoleMobile(int id, UserRoleMobileModel UserRoleMobileModel)
        {
            var updateStatus = await _UserRoleMobileService.Update(id, UserRoleMobileModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUserRoleMobile(int id)
        {
            var deleteStatus = await _UserRoleMobileService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}
