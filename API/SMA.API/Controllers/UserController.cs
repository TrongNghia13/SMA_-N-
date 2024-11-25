using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    public class UserController : ControllerBase
    {
        private readonly IUser _UserRepository;
        private readonly IMapper _Mapper;
        

        public UserController(IUser User,IMapper mapper)
        {
            _UserRepository = User;
            _Mapper = mapper;
        
            
        }

        [ActionName("GetAll")]
        [HttpGet]
		//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		public async Task<IActionResult> GetAllUser()
        {

            var listValue = await _UserRepository.GetAll();
            return Ok(listValue);
        }

		[ActionName("GetByID")]
        [HttpGet("{id}")]
		

		public async Task<IActionResult> GetUserById(int id)
        {
            var value = await _UserRepository.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("GetManagerById")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetManagerById(int id)
        {
            var value = await _UserRepository.GetManagerById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateUser(UsersManagerVmModel userModel)
        {
            var createStatus = await _UserRepository.Create(userModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateUser(int id, UserModel userModel)
        {
            var updateStatus = await _UserRepository.Update(id, userModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleteStatus = await _UserRepository.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpPut("SetRegistrationToken/{userId}")]

        public async Task<IActionResult> SetRegistrationToken(int userId, string registrationToken)
        {
            var updateStatus = await _UserRepository.SetRegistrationToken(userId, registrationToken);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }
        [HttpGet("{branchId}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListUserUseMobileByBranchID(string branchId)
        {
            var listValue = await _UserRepository.GetListUserUseMobileByBranchID(branchId);
            return Ok(listValue);
        }
    }
}
