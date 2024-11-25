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
    public class CateStoreTypeService : ICateStoreTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateStoreType> _cateStoreTypeService;
        private readonly IMapper _mapper;
        public CateStoreTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateStoreTypeService = _unitOfWork.CateStoreTypeRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateStoreTypeModel cttModel)
        {
            var _mapping = _mapper.Map<CateStoreType>(cttModel);
            try
            {
                await _cateStoreTypeService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cttModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cttModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateStoreTypeModel cttModel)
        {
            try
            {
                var map = _mapper.Map<CateStoreType>(cttModel);
                if (id != cttModel.StoreTypeID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateStoreTypeService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cttModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cttModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateStoreTypeService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateStoreTypeService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateStoreTypeModel>> GetAll()
        {
            var listEntity = await _cateStoreTypeService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateStoreTypeModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateStoreTypeService.GetAsync(id);
            var entityMapped = _mapper.Map<CateStoreTypeModel>(entity);
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
