using AutoMapper;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using DATA;
using DATA.Infastructure;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class RoleAppService : IRoleAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<RoleApp> _RoleAppRepository;
        private readonly IRepository<MenuApp> _MenuAppRepository;
        private readonly IRepository<Role> _RoleRepository;

        private readonly IMapper _mapper;
        public RoleAppService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _RoleAppRepository = _unitOfWork.RoleAppRepository;
            _RoleRepository = _unitOfWork.RoleRepository;
            _MenuAppRepository = _unitOfWork.MenuAppRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(RoleAppModel cctModel)
        {
            var _mapping = _mapper.Map<RoleApp>(cctModel);
            try
            {
                await _RoleAppRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cctModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cctModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(int id, RoleAppModel cctModel)
        {
            try
            {
                var map = _mapper.Map<RoleApp>(cctModel);
                if (id != cctModel.RoleAppID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _RoleAppRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cctModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cctModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _RoleAppRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _RoleAppRepository.DeleteAsync(value);
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
        public async Task<IEnumerable<RoleAppModel>> GetAll()
        {
            var listEntity = await _RoleAppRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<RoleAppModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _RoleAppRepository.GetAsync(id);
            var entityMapped = _mapper.Map<RoleAppModel>(entity);
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
        public async Task<ApiResponeModel> TreeAppByRole(int id)
        {
            var treApp = new List<TreeData>();

            var roleItem = await _RoleRepository.GetAsync(id);
            List<string> values = new List<string>()
            {

            };
            var ListApp = await _MenuAppRepository.GetAllAsync();
            var listRoleAppRaw = await _RoleAppRepository.GetAllAsync(c => c.RoleID == id);
            var listRoleApp = _mapper.Map<List<RoleAppModel>>(listRoleAppRaw);
            int countCheckChild = 0;
            for (int i = 0; i < listRoleApp.Count(); i++)
            {
                var entityApp = await _MenuAppRepository.GetAsync(c => c.MenuAppID == listRoleApp[i].MenuAppID);
                listRoleApp[i].MenuAppName = entityApp.MenuAppName;
                listRoleApp[i].RoleName = roleItem.RoleName;
            }
            if (listRoleApp != null)
            {
                TreeData treeGroupApp = new TreeData
                {
                    Key = "0",
                    Value = "0",
                    Title = "ALL",
                    AttrData = "",
                    CheckState = "",
                    Children = new List<TreeData>()
                };
                foreach (var itemMenu in ListApp)
                {
                    var itemRoleApp = listRoleApp != null ? listRoleApp.FirstOrDefault(p => p.MenuAppID == itemMenu.MenuAppID) : new RoleAppModel();
                    itemRoleApp = itemRoleApp == null ? new RoleAppModel()
                    {
                        RoleAppID = 0,
                        RoleID = id,
                        MenuAppID = itemMenu.MenuAppID,
                        MenuAppName = "",
                        RoleName = ""

                    } : itemRoleApp;

                    TreeData treeMenu = new TreeData
                    {
                        Key = itemMenu.MenuAppID.ToString(),
                        Value = itemMenu.MenuAppID.ToString(),
                        Title = itemMenu.MenuAppName,
                        AttrData = JsonSerializer.Serialize(itemRoleApp),
                        CheckState = itemRoleApp.RoleAppID > 0 ? "checked" : "",
                        Children = new List<TreeData>()
                    };
                    if (!string.IsNullOrEmpty(treeMenu.CheckState)) countCheckChild = countCheckChild + 1;
                    treeGroupApp.Children.Add(treeMenu);
                }
                if (countCheckChild > 0)
                {
                    treeGroupApp.CheckState = countCheckChild == treeGroupApp.Children.Count() ? "checked" : "indeterminate";
                }
                treApp.Add(treeGroupApp);
            }



            if (treApp == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = treApp,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<ApiResponeModel> RoleAppManagerByList(List<RoleApp> listRole)
        {
            if (listRole != null)
            {
                var listOldRole = await _RoleAppRepository.GetAllAsync(c => c.RoleID == listRole[0].RoleID);
                if (listOldRole != null)
                {
                    await _RoleAppRepository.DeleteRangeAsync(listOldRole);
                    await _RoleAppRepository.CreateRangeAsync(listRole);
                    await _unitOfWork.SaveChanges();

                }
            }
            if (listRole == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = listRole,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}
