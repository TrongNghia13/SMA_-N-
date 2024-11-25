using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{

		private readonly IAccountService _AccountService;

		public LoginController(IAccountService accountService) {

			_AccountService = accountService;

		}

		[HttpPost]
		public async Task<IActionResult> Login(LoginModel loginModel )
		{


			var User = await _AccountService.Validate(loginModel);
			if (User == null)
			{
				return Ok(new ApiResponeModel
				{

					Message = "Ivalid User Name or PassWord !",
					Success = false
				});
			}

			return Ok(new ApiResponeModel
			{

				Success = true,
				Message = "Login Success !",
				Data = await _AccountService.GennerateToken(User, loginModel.branchId)
			});
		}
		[HttpPost("ChangePassword")]
		public async Task<IActionResult> ChangePassword(LoginModel loginModel)
		{
			var changeStatus = await _AccountService.ChangePassword(loginModel);
			if (changeStatus == null || !changeStatus.Success)
			{
				return NotFound(changeStatus);
			}
			return Ok(changeStatus);
		}
	}
}
