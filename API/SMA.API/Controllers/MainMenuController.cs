using AutoMapper;
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
    public class MainMenuController : ControllerBase
    {
        private readonly IMainMenu _MainMenu;
        private readonly IMapper _Mapper;


        public MainMenuController(IMainMenu mainMenu, IMapper mapper)
        {
            _MainMenu = mainMenu;
            _Mapper = mapper;


        }

        [ActionName("GetAll")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _MainMenu.GetAll();
            return Ok(listValue);
        }

        [ActionName("GetByID")]
        [HttpGet("{id}")]


        public async Task<IActionResult> GetById(int id)
        {
            var value = await _MainMenu.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }





        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateMainMenu(MainMenuModel mainMenuModel)
        {
            var createStatus = await _MainMenu.Create(mainMenuModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [ActionName("Update")]
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateMainMenu(int id, MainMenuModel mainMenu)
        {
            var updateStatus = await _MainMenu.Update(id, mainMenu);
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
            var deleteStatus = await _MainMenu.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListMenuByUserId(int id)
        {
            var value = await _MainMenu.GetListMenuByUserId(id);
            if (value == null)
                return NotFound(value);

            return Ok(value);
        }
        [ActionName("GetByUserId")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMainMenuByUserId(int id)
        {
            var value = await _MainMenu.GetAllByUserId(id);
            if (value == null)
                return NotFound(value);

            return Ok(value);
        }
    }
}

