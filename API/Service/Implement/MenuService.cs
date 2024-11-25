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
    public class MenuService : IMenu
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Menu> _menuService;
        private readonly IMapper _mapper;

        public MenuService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _menuService = _unitOfWork.MenuRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(MenuModel menuModel)
        {
            var _mapping = _mapper.Map<Menu>(menuModel);
            try
            {
                await _menuService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = menuModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = menuModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(int id, MenuModel menuModel)
        {
            try
            {
                var map = _mapper.Map<Menu>(menuModel);
                if (id != menuModel.MenuID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _menuService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = menuModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = menuModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _menuService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _menuService.DeleteAsync(value);
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

        public async Task<IEnumerable<MenuModel>> GetAll()
        {
            var listEntity = await _menuService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<MenuModel>>(listEntity);
            return mapList;
        }
        public async Task<IEnumerable<MenuModel>> GetListMenuByMainMenuId(int id)
        {
            var listEntity = await _menuService.GetAllAsync(c => c.MainMenuId == id);
            var mapList = _mapper.Map<IEnumerable<MenuModel>>(listEntity).OrderBy(c => c.SortOrder);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _menuService.GetAsync(c => c.MenuID == id);
            var entityMapped = _mapper.Map<MenuModel>(entity);
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
    }
}
