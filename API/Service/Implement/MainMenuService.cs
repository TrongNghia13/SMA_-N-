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
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace Service.Implement
{
    public class MainMenuService : IMainMenu
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<MainMenu> _MainMenu;
        private readonly IRepository<Menu> _MenuRepository;
        private readonly IRepository<RoleMenu> _RoleMenuRepository;
        private readonly IRepository<User> _UserRepository;
        private readonly IRepository<UserRole> _UserRoleRepository;
        private readonly IMapper _mapper;

        public MainMenuService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _MainMenu = _unitOfWork.MainMenuRepository;
            _MenuRepository = _unitOfWork.MenuRepository;
            _RoleMenuRepository = _unitOfWork.RoleMenuRepository;
            _UserRoleRepository = _unitOfWork.UserRoleRepository;
            _UserRepository = _unitOfWork.UserRepository;
            _mapper = mapper;
        }
       
        public async Task<ApiResponeModel> Create(MainMenuModel mainMenuModel)
        {
            var _mapping = _mapper.Map<MainMenu>(mainMenuModel);
            try
            {
                await _MainMenu.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = mainMenuModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = mainMenuModel,
                };
            }
        }



        public async Task<ApiResponeModel> Update(int id, MainMenuModel mainMenuModel)
        {
            try
            {
                var map = _mapper.Map<MainMenu>(mainMenuModel);
                if (id != mainMenuModel.MainMenuID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _MainMenu.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = mainMenuModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = mainMenuModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _MainMenu.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _MainMenu.DeleteAsync(value);
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


        public async Task<IEnumerable<MainMenuModel>> GetAll()
        {
            var listEntity = await _MainMenu.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<MainMenuModel>>(listEntity).OrderBy(c=>c.SortOrder);
            return mapList;
        }



        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _MainMenu.GetAsync(id);
            var entityMapped = _mapper.Map<MainMenuModel>(entity);

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
        public async Task<IEnumerable<MainMenuModel>> GetAllByUserId(int UserId)
        {
            var listMenu = (
                            from u in _UserRepository._Table()
                            join ur in _UserRoleRepository._Table() on u.UserID equals ur.UserID
                            join m in _RoleMenuRepository._Table() on ur.RoleID equals m.RoleID
                            join mn in _MenuRepository._Table() on m.MenuID equals mn.MenuID
                            where u.UserID == UserId
                            select mn)
                            .Distinct()
                            .OrderBy(mm => mm.MainMenuId)
                            .OrderBy(m => m.MenuID)
                            .ToList();

            var existingListMainMenu = await _MainMenu.GetAllAsync();
            var newMainMenu = new List<MainMenuModel>();

            for (int i = 0; i < existingListMainMenu.Count(); i++)
            {
                var existingMenu = listMenu.FindAll(m => m.MainMenuId == existingListMainMenu[i].MainMenuID);
                var mainMenuModel = new MainMenuModel()
                {
                    MainMenuID = existingListMainMenu[i].MainMenuID,
                    MainMenuName = existingListMainMenu[i].MainMenuName,
                    Icon = existingListMainMenu[i].Icon,
                    SortOrder = existingListMainMenu[i].SortOrder,
                    listMenu = _mapper.Map<List<MenuModel>>(existingMenu)
                };
                newMainMenu.Add(mainMenuModel);
            }
            newMainMenu = newMainMenu.FindAll(n => n.listMenu.Count() != 0);
            return newMainMenu;
        }
        public async Task<ApiResponeModel> GetListMenuByUserId(int UserId)
        {
            var listMenu = (
                            from u in _UserRepository._Table()
                            join ur in _UserRoleRepository._Table() on u.UserID equals ur.UserID
                            join m in _RoleMenuRepository._Table() on ur.RoleID equals m.RoleID
                            join mn in _MenuRepository._Table() on m.MenuID equals mn.MenuID
                            where u.UserID == UserId
                            select mn)
                            .Distinct()
                            .OrderBy(mm => mm.MainMenuId)
                            .OrderBy(m => m.MenuID)
                            .ToList();

            var existingListMainMenu = await _MainMenu.GetAllAsync();
            List<MainMenuModel> mainMenu = new List<MainMenuModel>();

            for (int i = 0; i < existingListMainMenu.Count(); i++)
            {
                var existingMenu = listMenu.FindAll(m => m.MainMenuId == existingListMainMenu[i].MainMenuID);
                var mainMenuModel = new MainMenuModel()
                {
                    MainMenuID = existingListMainMenu[i].MainMenuID,
                    MainMenuName = existingListMainMenu[i].MainMenuName,
                    Icon = existingListMainMenu[i].Icon,
                    SortOrder = existingListMainMenu[i].SortOrder,
                    listMenu = _mapper.Map<List<MenuModel>>(existingMenu).OrderBy(c => c.SortOrder).ToList()
                };
                mainMenu.Add(mainMenuModel);
            }
            mainMenu = mainMenu.FindAll(n => n.listMenu.Count() != 0);
            List<MenuModel> fastAccessMenu = new List<MenuModel>();

            for (int i = 0; i < existingListMainMenu.Count(); i++)
            {
                var existingMenu = listMenu.FindAll(m => m.MainMenuId == existingListMainMenu[i].MainMenuID && m.IsFastAccess == true);
                fastAccessMenu = _mapper.Map<List<MenuModel>>(existingMenu).OrderBy(c=>c.SortOrder).ToList();
            }
            var listResultMenu = new MenuWebModel
            {
                fastAccessMenu = fastAccessMenu,
                mainMenu = mainMenu
            };
            return new ApiResponeModel
            {
                Status = 200,
                Success = true,
                Data = listResultMenu,
                Message = "ok"
            };
        }
    }
}

