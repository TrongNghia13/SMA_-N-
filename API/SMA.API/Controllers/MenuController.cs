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
    public class MenuController : ControllerBase
    {
        private readonly IMenu _menuService;
        private readonly IMapper _mapper;
        public MenuController(IMenu menu, IMapper mapper)
        {
            _menuService = menu;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _menuService.GetAll();
            return Ok(listValue);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateMenu(MenuModel menuModel)
        {
            var createStatus = await _menuService.Create(menuModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateMenu(int id, MenuModel menuModel)
        {
            var updateStatus = await _menuService.Update(id, menuModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            var deleteStatus = await _menuService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetListMenuByMainMenuId/{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListMenuByMainMenuId(int id)
        {
            try
            {
                var listValue = await _menuService.GetListMenuByMainMenuId(id);
                return Ok(listValue);
            }catch 
            {
                return BadRequest();
            }
            
        }

        [HttpGet("GetMenuById/{id}")]
        public async Task<IActionResult> GetMenuById(int id)
        {
            var value = await _menuService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

    }
}


