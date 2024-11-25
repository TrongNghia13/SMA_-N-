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
    public class CateStoreService : ICateStoreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateStore> _cateStoreRepository;
        private readonly IMapper _mapper;
        public CateStoreService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateStoreRepository = _unitOfWork.CateStoreRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateStoreModel cctModel)
        {
            var _mapping = _mapper.Map<CateStore>(cctModel);
            try
            {
                await _cateStoreRepository.CreateAsync(_mapping);
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
        public async Task<ApiResponeModel> Update(string id, CateStoreModel cctModel)
        {
            try
            {
                var map = _mapper.Map<CateStore>(cctModel);
                if (id != cctModel.StoreID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateStoreRepository.UpdateAsync(map);
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
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateStoreRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateStoreRepository.DeleteAsync(value);
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
        public async Task<IEnumerable<CateStoreModel>> GetAll()
        {
            var listEntity = await _cateStoreRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateStoreModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateStoreRepository.GetAsync(id);
            var entityMapped = _mapper.Map<CateStoreModel>(entity);
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
        public async Task<IEnumerable<CateStoreModel>> GetStoreByTypeBranch(string typeId,string branchId)
        {
            var entity = await _cateStoreRepository.GetAllAsync();
            if(typeId != "0")
            {
                entity = entity.Where(c => c.StoreTypeID == typeId).ToList();
            }
            if(branchId != "0")
            {
                entity = entity.Where(c => c.BranchID == branchId).ToList();
            }
            var entityMapped = _mapper.Map< IEnumerable<CateStoreModel>>(entity);
            return entityMapped;
        }
    }
}
