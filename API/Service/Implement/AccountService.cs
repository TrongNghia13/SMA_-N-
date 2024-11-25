using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DATA;
using DATA.Infastructure;
using Helper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Model.Models;
using Service.Interface;

namespace Service.Implement
{
	public class AccountService : IAccountService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<User> _UserRepository;
		private readonly IRepository<UserBranch> _UserBranchRepository;
		private readonly IRepository<RoleMenu> _RoleMenu;
		private readonly IRepository<UserRole> _UserRole;
		private readonly IRepository<Employee> _EmployeeRepository;
		private readonly IRepository<Branch> _BranchRepository;

		private readonly IMapper _Mapper;
		private readonly JwtModel _JwtModel;

		public AccountService(IUnitOfWork unitOfWork, IOptionsMonitor<JwtModel> optionsMonitor, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_UserRepository = _unitOfWork.UserRepository;
			_UserBranchRepository = _unitOfWork.UserBranchRepository;
			_RoleMenu = _unitOfWork.RoleMenuRepository;
			_UserRole = _unitOfWork.UserRoleRepository;
			_JwtModel = optionsMonitor.CurrentValue;
			_Mapper = mapper;
			_EmployeeRepository = _unitOfWork.EmployeeRepository;
			_BranchRepository = _unitOfWork.BranchRepository;
		}

		public async Task<string> GennerateToken(User user, string branchId)
		{
			var jwtTokenHandler = new JwtSecurityTokenHandler();
			var secretKeyBytes = Encoding.UTF8.GetBytes(_JwtModel.SecretKey);
			var employee = await _EmployeeRepository.GetAsync(c => c.EmployeeID == user.EmployeeID);
			var branch = await _BranchRepository.GetAsync(c=>c.BranchID == branchId);
			var tokeDescription = new SecurityTokenDescriptor
			{
				Issuer = "SMA",
				Audience = "Anyone",
				Subject = new ClaimsIdentity(new[] {
					new Claim("UserId", user.UserID.ToString()),
					new Claim("UserName", user.UserName ?? ""),
					new Claim("EmployeeId",user.EmployeeID.ToString() ?? ""),
					new Claim("EmployeeName",employee.FullName ?? ""),
					new Claim("BranchId",branch.BranchID),
					new Claim("BranchName",branch.BranchName ?? ""),
					new Claim("TokenID", Guid.NewGuid().ToString()),

				}),
				NotBefore = DateTime.Now,
				Expires = DateTime.Now.AddHours(4),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256)
			};
			var token = jwtTokenHandler.CreateJwtSecurityToken(tokeDescription);
			return jwtTokenHandler.WriteToken(token);
		}

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


        public async Task<User> Validate(LoginModel loginModel)
		{

			//var user = (from u in _UserRepository._Table()
			//			join uc in _UserCompanyRepository._Table() on u.UserID equals uc.UserID
			//			where u.UserName == loginModel.userName && u.Password == loginModel.password
			//			&& uc.CompanyId == loginModel.companyId
			//			select u).FirstOrDefault();

			var user = await _UserRepository.GetAsync(u => u.UserName == loginModel.userName && u.Password == MD5Helper.CalculateMD5Hash(loginModel.password));
			if (user != null)
			{
				var isExisttCompany = await _UserBranchRepository.AnyAsync(p => p.UserID == user.UserID && p.BranchID == loginModel.branchId);
				if (!isExisttCompany) user = null;
			}
			return user;
		}
		public async Task<ApiResponeModel> ChangePassword(LoginModel loginModel)
        {
			var entity = await _UserRepository.GetAsync(c => c.UserName.ToLower().Trim() == loginModel.userName.ToString().ToLower().Trim());
			if (entity !=null && entity.Password == MD5Helper.CalculateMD5Hash(loginModel?.password))
			{
				if (loginModel.password != null && loginModel.newPassword.Length >= 8)
				{
					try
					{
						entity.Password = MD5Helper.CalculateMD5Hash(loginModel.newPassword);
						await _UserRepository.UpdateAsync(entity);
						await _unitOfWork.SaveChanges();
						return new ApiResponeModel
						{
							Data = "",
							Success = true,
							Message = "Get Successfully!"
						};
					}
					catch (Exception ex)
					{
						return new ApiResponeModel
						{
							Success = false,
							Message = ex.Message
						};
					}
				}
                else
                {
					return new ApiResponeModel
					{
						Data = loginModel,
						Success = false,
						Message = "failed"
					};
				}
			}
			else
			return new ApiResponeModel
			{
				Data = loginModel,
				Success = false,
				Message = "failed"
			};
		}
	}
}



