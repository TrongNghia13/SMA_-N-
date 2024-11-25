using AutoMapper;
using DATA;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class RoleMenuController : ControllerBase
    {
        private readonly IRoleMenu _RoleMenuService;
        private readonly IMapper _Mapper;


        public RoleMenuController(IRoleMenu roleMenu, IMapper mapper)
        {
            _RoleMenuService = roleMenu;
            _Mapper = mapper;


        }

        [ActionName("GetAll")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllRoleMenu()
        {

            var listValue = await _RoleMenuService.GetAll();
            return Ok(listValue);
        }

        [ActionName("GetByRoleMenuId")]
        [HttpGet("{id}")]
        

        public async Task<IActionResult> GetRoleMenuById(int id)
        {
            var value = await _RoleMenuService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

		[ActionName("GetByRoleId")]
		[HttpGet("{id}")]


		public async Task<IActionResult> GetRoleId(int id)
        {
            var value = await _RoleMenuService.GetByRoleId(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

		[ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> Create(RoleMenuModel roleMenuModel)
        {
            var createStatus = await _RoleMenuService.Create(roleMenuModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateRoleMenu(int id,RoleMenuModel roleMenu)
        {
            var updateStatus = await _RoleMenuService.Update(id, roleMenu);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }

        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteRole(int id)
        {
            var deleteStatus = await _RoleMenuService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [ActionName("GetListRoleMenuByRoleId/{roleId}")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListRoleMenuByRoleId(int roleId)
        {
            try
            {
                var listValue = await _RoleMenuService.GetListRoleMenuByRoleId(roleId);
                return Ok(listValue);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{roleId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListMenuByRoleId(int roleId)
        {
            try
            {
                var listValue = await _RoleMenuService.GetListMenuByRoleId(roleId);
                return Ok(listValue);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost()]
        public async Task<IActionResult> RoleMenuManagerByList(List<RoleMenu> listRole)
        {
            var value = await _RoleMenuService.RoleMenuManagerByList(listRole);
            return Ok(value);
        }
    }
}
