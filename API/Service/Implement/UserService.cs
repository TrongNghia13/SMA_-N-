

using AutoMapper;
using DATA;
using DATA.Infastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class UserService : IUser
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<User> _UserRepository;
        private readonly IMapper _mapper;
        private readonly JwtModel _JwtModel;
        private readonly IRepository<UserBranch> _UserBranchRepository;
        private readonly IRepository<Employee> _EmployeeRepository;
        private readonly IRepository<UserRole> _UserRoleRepository;


        public UserService(IUnitOfWork unitOfWork, IOptionsMonitor<JwtModel> optionsMonitor, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _UserRepository = _unitOfWork.UserRepository;
            _JwtModel = optionsMonitor.CurrentValue;
            _mapper = mapper;
            _UserBranchRepository = _unitOfWork.UserBranchRepository;
            _EmployeeRepository = _unitOfWork.EmployeeRepository;
            _UserRoleRepository = _unitOfWork.UserRoleRepository;
        }

        public async Task<ApiResponeModel> Create(UsersManagerVmModel userModel)
        {
            var _mapping = _mapper.Map<User>(userModel.User);
            try
            {
                await _UserRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = userModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = userModel,
                };
            }

        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _UserRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _UserRepository.DeleteAsync(value);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Data = id,
                        Success = true,
                        Message = "Delete Successfully"
                    };
                }
                catch (Exception ex)
                {
                    return new ApiResponeModel
                    {
                        Data = id,
                        Success = false,
                        Message = "There was an error during the data deletion process." + ex.Message
                    };
                }
            }
            return new ApiResponeModel
            {
                Data = id,
                Success = false,
                Message = "ID Not Found"
            };
        }

        public async Task<IEnumerable<UserModel>> GetAll()
        {
            var listEntity = await _UserRepository.GetAllAsync();
            var mapList = _mapper.Map<List<UserModel>>(listEntity);
            for(int i = 0; i < mapList.Count; i++)
            {
                var employeeInfo = await _EmployeeRepository.GetAsync(mapList[i].EmployeeID);
                if(employeeInfo != null)
                {
                    mapList[i].FullName = employeeInfo.FullName;
                }
            }
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _UserRepository.GetAsync(id);
            var entityMapped = _mapper.Map<UserModel>(entity);
            if (entityMapped == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = entityMapped,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<ApiResponeModel> GetManagerById(int id)
        {
            var entity = await _UserRepository.GetAsync(id);
            var entityMapped = _mapper.Map<UserModel>(entity);
            UsersManagerVmModel model = new UsersManagerVmModel();
            model.User = entityMapped;
            var userBranch = await _UserBranchRepository.GetAllAsync(c => c.UserID == entityMapped.UserID);
            var userRole = await _UserRoleRepository.GetAllAsync(c => c.UserID == entityMapped.UserID);
            if(userBranch != null)
            {
                model.BranchForUser = userBranch.Select(c=>c.BranchID).ToList();
            }
            if(userRole != null)
            {
                model.RoleForUser = userRole.Select(c => c.RoleID).ToList();
            }
            if (entityMapped == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = model,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<ApiResponeModel> Update(int id, UserModel userModel)
        {
            try
            {
                var map = _mapper.Map<User>(userModel);
                if (id != userModel.UserID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _UserRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = userModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = userModel,
                };
            }
        }

        public async Task<Object> Validate(UserModel user)
        {
            return await _UserRepository.SingleOrDefaultAsync(u => u.UserName == user.UserName && u.Password == user.Password && u.IsActive == true); ;
        }

        public async Task<string> GennerateToken(UserModel user)
        {

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_JwtModel.SecretKey);
            var tokeDescription = new SecurityTokenDescriptor
            {
                Issuer = "BMSOFT",
                Audience = "Anyone",
                Subject = new ClaimsIdentity(new[] {
                    new Claim("UserId", user.UserID.ToString()),
                    new Claim("UserName", user.UserName),
                    new Claim("NhanVien",user.EmployeeID.ToString()),
					//roles

					new Claim("TokenID", Guid.NewGuid().ToString())
                }),
                NotBefore = DateTime.Now,
                Expires = DateTime.Now.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256)
            };
            var token = jwtTokenHandler.CreateJwtSecurityToken(tokeDescription);
            return jwtTokenHandler.WriteToken(token);
        }
        public async Task<ApiResponeModel> SetRegistrationToken(int userId, string registrationToken)
        {
            var userModel = await _UserRepository.GetAsync(userId);
            
            try
            {
                var listRegistrationToken = await _UserRepository.GetAllAsync(c => c.RegistrationToken == registrationToken);
                if(listRegistrationToken.Count != 0)
                {
                    for (var i = 0; i < listRegistrationToken.Count; i++)
                    {
                        listRegistrationToken[i].RegistrationToken = "0";
                        await _UserRepository.UpdateAsync(listRegistrationToken[i]);
                    }
                }
                if (userId != userModel.UserID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    userModel.RegistrationToken = registrationToken;
                    await _UserRepository.UpdateAsync(userModel);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                };
            }
        }
        public async Task<IEnumerable<UserInformationModel>> GetListUserUseMobileByBranchID(string branchId)
        {
            var listUserInfor = new List<UserInformationModel>();
            try
            {
                var listUserBranch = await _UserBranchRepository.GetAllAsync(c => c.BranchID == branchId);
                List<int?> listIdUser = listUserBranch.Select(x => x.UserID).ToList();
                var listEntity = await _UserRepository.GetAllAsync(c => c.RegistrationToken != null && c.RegistrationToken.Length > 2);
                var listUserUserMobileById = listEntity.Where(itemB => listIdUser.Contains(itemB.UserID) && itemB.IsActive == true).ToList();
                var listEmployee = new List<Employee>();
                for (int i = 0; i < listUserUserMobileById.Count; i++)
                {
                    var employeeEntity = await _EmployeeRepository.GetAsync(listUserUserMobileById[i]?.EmployeeID!);
                    listEmployee.Add(employeeEntity);
                }
                var mapList = _mapper.Map<IEnumerable<UserModel>>(listUserUserMobileById);
              
                for (int i = 0; i < listUserUserMobileById.Count; i++)
                {
                    for (int j = 0; j < listEmployee.Count; j++)
                    {
                        if (listUserUserMobileById[i].EmployeeID == listEmployee[j].EmployeeID)
                        {
                            listUserInfor.Add(new UserInformationModel
                            {
                                UserName = listUserUserMobileById[i].UserName,
                                FullName = listEmployee[j].FullName
                            });
                            break;
                        }
                    }
                }
                return listUserInfor;
            }
            catch
            {
                return listUserInfor;
            }
        }
    }
}

