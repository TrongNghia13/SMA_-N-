using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DATA;
using Microsoft.AspNetCore.Identity;
using Model.Models;

namespace Service.Interface
{
	public interface IAccountService
	{
		Task<User> Validate(LoginModel loginModel);
		Task<string> GennerateToken(User user, string branchId);
		Task<ApiResponeModel> ChangePassword(LoginModel loginModel);

	}
}
