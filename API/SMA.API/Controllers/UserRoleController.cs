using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRole _UserRoleRepository;
        private readonly IMapper _Mapper;


        public UserRoleController(IUserRole userRole, IMapper mapper)
        {
            _UserRoleRepository = userRole;
            _Mapper = mapper;


        }

        [HttpGet("GetAll")]
       
        public async Task<IActionResult> GetAllUserRole()
        {

            var userRole = await _UserRoleRepository.GetAll();
            return Ok(userRole);
        }

        [HttpGet("GetListRoleByUserId/{id}")]


        public async Task<IActionResult> GetListRoleByUserId(int id)
        {
            var userRole = await _UserRoleRepository.GetListRoleByUserId(id);
            if (userRole == null)
                return NotFound();
            return Ok(userRole);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetUserRoleById(int id)
        {
            var userRole = await _UserRoleRepository.GetById(id);
            if (userRole == null)
                return NotFound();
            return Ok(userRole);
        }


        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> Create(UserRoleModel userRole)
        {
            var createStatus = await _UserRoleRepository.Create(userRole);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateUserRole(int id,UserRoleModel userRole)
        {
            var updateStatus = await _UserRoleRepository.Update(id, userRole);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }

        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteRole(int id)
        {
            var deleteStatus = await _UserRoleRepository.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetListRoleAppDetailByUserId/{userId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListRoleAppDetailByUserId(int userId)
        {
            try
            {
                var listValue = await _UserRoleRepository.GetListRoleAppDetailByUserId(userId);
                return Ok(listValue);

            }
            catch
            {
                return BadRequest();
            }
        }
      
    }
}
