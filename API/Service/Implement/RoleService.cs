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
    public class RoleService : IRole
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Role> _RoleRepository;
        private readonly IMapper _mapper;

        public RoleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _RoleRepository = _unitOfWork.RoleRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(RoleModel roleModel)
        {
            var _mapping = _mapper.Map<Role>(roleModel);
            try
            {
                await _RoleRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = roleModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = roleModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(int id, RoleModel roleModel)
        {
            try
            {
                var map = _mapper.Map<Role>(roleModel);
                if (id != roleModel.RoleID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _RoleRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = roleModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = roleModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _RoleRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _RoleRepository.DeleteAsync(value);
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
        public async Task<IEnumerable<RoleModel>> GetAll()
        {
            var listEntity = await _RoleRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<RoleModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _RoleRepository.GetAsync(id);
            var entityMapped = _mapper.Map<RoleModel>(entity);
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

