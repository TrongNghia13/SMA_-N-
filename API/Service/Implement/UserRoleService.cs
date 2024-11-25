using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class UserRoleService : IUserRole
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<UserRole> _UserRoleRepository;
        private readonly IRepository<Role> _RoleRepository;
        private readonly IRepository<RoleApp> _RoleAppRepository;
        private readonly IRepository<MenuApp> _MenuAppRepository;


        private readonly IMapper _mapper;

        public UserRoleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _UserRoleRepository = _unitOfWork.UserRoleRepository;
            _RoleRepository = _unitOfWork.RoleRepository;
            _RoleAppRepository= _unitOfWork.RoleAppRepository;
            _MenuAppRepository = _unitOfWork.MenuAppRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(UserRoleModel userRoleModel)
        {
            var _mapping = _mapper.Map<UserRole>(userRoleModel);
            try
            {
                await _UserRoleRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = userRoleModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = userRoleModel,
                };
            }

        }


        public async Task<ApiResponeModel> Update(int id, UserRoleModel userRoleModel)
        {
            try
            {
                var map = _mapper.Map<UserRole>(userRoleModel);
                if (id != userRoleModel.UserRoleID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _UserRoleRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = userRoleModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = userRoleModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _UserRoleRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _UserRoleRepository.DeleteAsync(value);
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

        public async Task<IEnumerable<UserRoleModel>> GetAll()
        {

            var listEntity = await _UserRoleRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<UserRoleModel>>(listEntity);
            return mapList;

        }

        public async Task<IEnumerable<UserRoleModel>> GetListRoleByUserId(int userId)
        {

            var listUserRole = await _UserRoleRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<UserRoleModel>>(listUserRole).Where(x => x.UserID == userId).ToList();
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _UserRoleRepository.GetAsync(id);
            var entityMapped = _mapper.Map<UserRoleModel>(entity);
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

        public async Task<IEnumerable<UserRoleModel>> GetListRoleAppByUserId(int userId)
        {
            var listUserRole = await _UserRoleRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<UserRoleModel>>(listUserRole).Where(x => x.UserID == userId).ToList();
            return mapList;
        }
        public async Task<IEnumerable<MenuAppModel>> GetListRoleAppDetailByUserId(int userId)
        {
            var listRoleByUserId = await _UserRoleRepository.GetAllAsync(u => u.UserID == userId);
            var listRole = await _RoleRepository.GetAllAsync();
            int roleIdForAppByRoleId = listRole.Where(x => listRoleByUserId.Any(c=>c.RoleID == x.RoleID) && x.RoleType!.Contains("A")).First().RoleID;
            var listRoleApp = await _RoleAppRepository.GetAllAsync(c => c.RoleID == roleIdForAppByRoleId);
            List<MenuApp> listMenuApp = new List<MenuApp>();
            for (var i = 0; i < listRoleApp.Count; i++)
            {
                var entityMenuApp = await _MenuAppRepository.GetAsync(m => m.MenuAppID == listRoleApp[i].MenuAppID);
                listMenuApp.Add(entityMenuApp);
            }
            var mapMenuApp = _mapper.Map< IEnumerable<MenuAppModel>>(listMenuApp);
            return mapMenuApp;
        }
    }
}
