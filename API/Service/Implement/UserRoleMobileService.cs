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
using System.Threading.Tasks;

namespace Service.Implement
{
    public class UserRoleMobileService : IUserRoleMobileService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<UserRoleMobile> _UserRoleMobileService;
        private readonly IMapper _mapper;
        public UserRoleMobileService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _UserRoleMobileService = _unitOfWork.UserRoleMobileRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(UserRoleMobileModel cctModel)
        {
            var _mapping = _mapper.Map<UserRoleMobile>(cctModel);
            try
            {
                await _UserRoleMobileService.CreateAsync(_mapping);
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
        public async Task<ApiResponeModel> Update(int id, UserRoleMobileModel cctModel)
        {
            try
            {
                var map = _mapper.Map<UserRoleMobile>(cctModel);
                if (id != cctModel.UraID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _UserRoleMobileService.UpdateAsync(map);
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
            var value = await _UserRoleMobileService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _UserRoleMobileService.DeleteAsync(value);
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
        public async Task<IEnumerable<UserRoleMobileModel>> GetAll()
        {
            var listEntity = await _UserRoleMobileService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<UserRoleMobileModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _UserRoleMobileService.GetAsync(id);
            var entityMapped = _mapper.Map<UserRoleMobileModel>(entity);
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
