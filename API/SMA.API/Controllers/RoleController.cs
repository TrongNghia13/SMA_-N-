using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRole _RoleRepository;
        private readonly IMapper _Mapper;


        public RoleController(IRole role, IMapper mapper)
        {
            _RoleRepository = role;
            _Mapper = mapper;


        }

        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllRole()
        {
            var listValue = await _RoleRepository.GetAll();
            return Ok(listValue);
        }

        [ActionName("GetByID")]
        [HttpGet("{id}")]
        

        public async Task<IActionResult> GetRoleByRoleMenuId(int id)
        {
            var value = await _RoleRepository.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }


        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> AddCompany(RoleModel role)
        {
            var createStatus = await _RoleRepository.Create(role);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateRole(int id,RoleModel role)
        {

            var updateStatus = await _RoleRepository.Update(id, role);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }

        [ActionName("Delete")]
        [HttpDelete("{id}")]
        
        public async Task<IActionResult> DeleteRole(int id)
        {
            var deleteStatus = await _RoleRepository.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
    }
}

