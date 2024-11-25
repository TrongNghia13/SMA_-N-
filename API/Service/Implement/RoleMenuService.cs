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
using Org.BouncyCastle.Asn1.Ocsp;
using System.Text.Json;

namespace Service.Implement
{
    public class RoleMenuService : IRoleMenu
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<RoleMenu> _RoleMenuRepository;
        private readonly IRepository<Menu> _MenuRepository;
        private readonly IRepository<Role> _RoleRepository;
        private readonly IRepository<MainMenu> _MainMenuRepository;

        private readonly IMapper _mapper;

        public RoleMenuService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _RoleMenuRepository = _unitOfWork.RoleMenuRepository;
            _MenuRepository = _unitOfWork.MenuRepository;
            _RoleRepository = _unitOfWork.RoleRepository;
            _MainMenuRepository = _unitOfWork.MainMenuRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(RoleMenuModel roleMenuModel)
        {
            var _mapping = _mapper.Map<RoleMenu>(roleMenuModel);
            try
            {
                await _RoleMenuRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = roleMenuModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = roleMenuModel,
                };
            }

        }


        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _RoleMenuRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _RoleMenuRepository.DeleteAsync(value);
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

        public async Task<IEnumerable<RoleMenuModel>> GetAll()
        {
            var listEntity = await _RoleMenuRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<RoleMenuModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _RoleMenuRepository.GetAsync(id);
            var entityMapped = _mapper.Map<RoleMenuModel>(entity);
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

        public async Task<ApiResponeModel> GetByRoleId(int id)
        {
            var role = await _RoleMenuRepository.GetAsync(r => r.RoleID == id);
            var entityMapped = _mapper.Map<RoleMenuModel>(role);
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

        public async Task<ApiResponeModel> Update(int id, RoleMenuModel roleMenuModel)
        {
            try
            {
                var map = _mapper.Map<RoleMenu>(roleMenuModel);
                if (id != roleMenuModel.RoleMenuID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _RoleMenuRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = roleMenuModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = roleMenuModel,
                };
            }
        }
        public async Task<IEnumerable<RoleMenuModel>> GetListRoleMenuByRoleId(int roleId)
        {
            var listEntity = await _RoleMenuRepository.GetAllAsync(c => c.RoleID == roleId);
            var mapList = _mapper.Map<IEnumerable<RoleMenuModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetListMenuByRoleId(int id)
        {
            var treMenu = new List<TreeData>();

            var roleItem = await _RoleRepository.GetAsync(id);
            var listMainMenu = await _MainMenuRepository.GetAllAsync();
            var listMenu = await _MenuRepository.GetAllAsync();
            var listRoleMenuRaw = await _RoleMenuRepository.GetAllAsync(c=>c.RoleID == id);
            var listRoleMenu = _mapper.Map<List<RoleMenuModel>>(listRoleMenuRaw);
            for(int i = 0;i < listRoleMenu.Count(); i++)
            {
                var entityMenu = await _MenuRepository.GetAsync(listRoleMenu[i].MenuID);
                listRoleMenu[i].MenuName = entityMenu.MenuName;
                listRoleMenu[i].RoleName = roleItem.RoleName;
            }
            if (listMainMenu != null)
            {
                foreach (var item in listMainMenu)
                {
                    int countCheckChild = 0;
                    if (listMenu != null)
                    {
                        var listMenuByMain = listMenu.Where(p => p.MainMenuId == item.MainMenuID).ToList();
                        if (listMenuByMain.Count > 0)
                        {
                            TreeData treeMainMenu = new TreeData
                            {
                                Key = item.MainMenuID.ToString(),
                                Value = item.MainMenuID.ToString(),
                                Title = item.MainMenuName,
                                AttrData = "",
                                CheckState = "",
                                Children = new List<TreeData>()
                            };
                            foreach (var itemMenu in listMenuByMain)
                            {
                                var itemRoleMenu = listRoleMenu != null ? listRoleMenu.FirstOrDefault(p => p.MenuID == itemMenu.MenuID) : new RoleMenuModel();
                                itemRoleMenu = itemRoleMenu == null ? new RoleMenuModel()
                                {
                                    RoleMenuID = 0,
                                    RoleID = id,
                                    MenuID = itemMenu.MenuID,
                                    MenuName = "",
                                    RoleName = ""

                                } : itemRoleMenu;

                                TreeData treeMenu = new TreeData
                                {
                                    Key = itemMenu.MenuID.ToString(),
                                    Value = itemMenu.MenuID.ToString(),
                                    Title = itemMenu.MenuName,
                                    AttrData = JsonSerializer.Serialize(itemRoleMenu),
                                    CheckState = itemRoleMenu.RoleMenuID > 0 ? "checked" : "",
                                    Children = new List<TreeData>()
                                };
                                if (!string.IsNullOrEmpty(treeMenu.CheckState)) countCheckChild = countCheckChild + 1;
                                treeMainMenu.Children.Add(treeMenu);
                            }
                            if (countCheckChild > 0)
                            {
                                treeMainMenu.CheckState = countCheckChild == treeMainMenu.Children.Count() ? "checked" : "indeterminate";
                            }
                            treMenu.Add(treeMainMenu);
                        }
                    }
                }
            }
            if (treMenu == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = treMenu,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<ApiResponeModel> RoleMenuManagerByList(List<RoleMenu> listRole)
        {
            if (listRole != null)
            {
                var listOldRole = await _RoleMenuRepository.GetAllAsync(c => c.RoleID == listRole[0].RoleID);
                if (listOldRole != null)
                {
                    await _RoleMenuRepository.DeleteRangeAsync(listOldRole);
                    await _RoleMenuRepository.CreateRangeAsync(listRole);
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

